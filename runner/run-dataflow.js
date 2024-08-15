const { performance } = require("perf_hooks");

const debug = require("cgps-stdlib/logger/debug.js");

const parseInputArguments = require("./parse-input-arguments");
const parseOutputArguments = require("./parse-output-arguments");
const { sortStagesByExecutionOrder } = require("./execution");

module.exports = async function (
  manifest,
  rawValues,
  inDebugMode,
  engine,
) {
  const run = {
    started: performance.now(),
    steps: [],
  };

  try {
    // check input against manifest
    const dataflowInputs = parseInputArguments(manifest.input, rawValues);
    run.inputs = dataflowInputs;

    // cache outputs of all steps
    run.outputs = {};

    const transformSteps = sortStagesByExecutionOrder(manifest.transform);

    const dependencyGraph = [];
    for (const transformationStep of transformSteps) {
      for (const binding of transformationStep.binding) {
        if (binding.type === "input") {
          dependencyGraph.push({
            transformation: transformationStep.name,
            dependsOn: {
              input: binding.input,
            },
          });
        }
        else if (binding.type === "transformation") {
          dependencyGraph.push({
            transformation: transformationStep.name,
            dependsOn: {
              transformation: binding.transformation,
              argument: binding.argument,
            },
          });
        }
      }
    }
    for (const outputSpec of manifest.output) {
      dependencyGraph.push({
        output: outputSpec.name,
        dependsOn: {
          transformation: outputSpec.transformation,
          argument: outputSpec.argument,
        },
      });
    }

    for (const transformationStep of transformSteps) {
      const transformationStepName = transformationStep.name;
      const step = {
        transformation: transformationStepName,
        type: transformationStep.type,
        [transformationStep.type]: transformationStep[transformationStep.type],
        started: performance.now(),
      };
      run.steps.push(step);

      try {
        // Check that name is unique
        if (transformationStepName in run.outputs) {
          throw new Error(`The name ${transformationStepName} exists already.`);
        }

        // Get the manifest for the current transformation based on its type
        let transformationManifest = null;
        if (transformationStep.type === "adaptor") {
          transformationManifest = await engine.getAdaptorManifest(transformationStep.adaptor);
        }
        // else if (transformationStep.type === "dataflow") {
        //   transformationManifest = await engine.getDataflowManifest(transformationStep.dataflow);
        // }
        else {
          throw new Error(`Invalid transformation type ${transformationStep.type}.`);
        }

        // Collect transformation inputs
        step.inputs = {};
        for (const binding of transformationStep.binding) {
          // const inputArgumentSpec = transformationManifest.input.find((x) => x.name === binding.target);
          // if (!inputArgumentSpec) {
          //   throw new Error(`Invalid binding for ${transformationStepName}: cannot find argument named ${binding.target} in ${transformationStep.type} ${transformationStep[transformationStep.type]}.`);
          // }

          if (binding.type === "input") {
            if (binding.input in dataflowInputs) {
              step.inputs[binding.target] = dataflowInputs[binding.input];
            }
            else {
              throw new Error(`Invalid binding for ${transformationStepName}: cannot find input argument named ${binding.input}.`);
            }
          }
          else if (binding.type === "value") {
            step.inputs[binding.target] = binding.value;
          }
          else if (binding.type === "transformation") {
            if (binding.transformation in run.outputs) {
              if (binding.argument in run.outputs[binding.transformation]) {
                step.inputs[binding.target] = run.outputs[binding.transformation][binding.argument];
              }
              else {
                throw new Error(`Invalid binding for ${transformationStepName}: cannot find argument named ${binding.argument} in transformation ${binding.transformation}.`);
              }
            }
            else {
              throw new Error(`Invalid binding for ${transformationStepName}: cannot find transformation ${binding.transformation}.`);
            }
          }
          else {
            throw new Error(`Invalid binding type for ${transformationStepName}: ${binding.type}.`);
          }
        }

        // Run the transformation as an adaptor or a dataflow based on its type
        if (transformationStep.type === "adaptor") {
          debug("running adaptor", transformationStep.adaptor, transformationStep.name, transformationStep.description);
          run.outputs[transformationStepName] = await engine.runAdaptor(transformationStep.adaptor, step.inputs);
        }
        // else if (transformationStep.type === "dataflow") {
        //   const stepRun = await engine.runWorkflow(transformationManifest, step.inputs);
        //   if (stepRun.status === "error") {
        //     throw stepRun.error;
        //   }
        //   run.outputs[transformationStepName] = stepRun.outputs;
        // }

        // Record execution time and mark the step as success
        step.ended = performance.now();
        step.duration = (step.ended - step.started) / 1000; // in seconds
        delete step.started;
        delete step.ended;
        step.status = "success";
        step.outputs = run.outputs[transformationStepName];

        // Clean-up inputs and outputs when not in debug mode
        if (!inDebugMode) {
          step.inputs = undefined;
          step.outputs = undefined;

          // Remove outputs which will not be used
          for (const outputName of Object.keys(run.outputs[transformationStepName])) {
            const inUse = dependencyGraph.some((x) => x.dependsOn.transformation === transformationStepName && x.dependsOn.argument === outputName);
            if (!inUse) {
              run.outputs[transformationStepName][outputName] = undefined;
            }
          }

          // Remove current step from dependency graph
          for (let index = 0; index < dependencyGraph.length; index++) {
            const dependency = dependencyGraph[index];
            if (dependency.transformation === transformationStepName && dependency.dependsOn.transformation) {
              const inUse = dependencyGraph.some(
                (x) =>
                  (x.transformation !== transformationStepName)
                  &&
                  (x.dependsOn.transformation === dependency.dependsOn.transformation)
                  &&
                  (x.dependsOn.argument === dependency.dependsOn.argument)
              );
              if (!inUse) {
                run.outputs[dependency.dependsOn.transformation][dependency.dependsOn.argument] = undefined;
              }

              dependencyGraph.splice(index, 1);
            }
          }
        }
      }
      catch (error) {
        console.error(error);
        step.error = error.message || error;
        step.status = "error";

        // Throw to break the execution of next steps
        throw error;
      }
    }

    // Collect dataflow outputs
    const rawOutputs = {};
    for (const outputSpec of manifest.output) {
      if (outputSpec.transformation in run.outputs) {
        if (outputSpec.argument in run.outputs[outputSpec.transformation]) {
          rawOutputs[outputSpec.name] = run.outputs[outputSpec.transformation][outputSpec.argument];
        }
        else {
          throw new Error(`Cannot bind output argument ${outputSpec.name}. Cannot find argument named ${outputSpec.argument} in transformation ${outputSpec.transformation}.`);
        }
      }
      else {
        throw new Error(`Cannot bind output argument ${outputSpec.name}. Cannot find transformation ${outputSpec.transformation}.`);
      }
    }

    // check output against manifest
    run.outputs = parseOutputArguments(manifest.output, rawOutputs);
    run.status = "success";
  }
  catch (error) {
    console.error(error);
    run.error = error.message || error;
    run.status = "error";
  }

  run.ended = performance.now();
  run.duration = (run.ended - run.started); // in milliseconds

  return run;
};
