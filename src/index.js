import React, { Component } from "react";

class Histogram extends Component {
  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  render() {
    return (
      <canvas
        ref={node => (this.histoCanvas = node)}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }

  updateCanvas() {
    /*!
		 * Chart.js
		 * http://chartjs.org/
		 *
		 * Copyright 2013 Nick Downie
		 * Released under the MIT license
		 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
		 */
    const Chart = function(context) {
      const chart = this;

      // Easing functions adapted from Robert Penner's easing equations
      // http://www.robertpenner.com/easing/

      var animationOptions = {
        linear(t) {
          return t;
        },
        easeInQuad(t) {
          return t * t;
        },
        easeOutQuad(t) {
          return -1 * t * (t - 2);
        },
        easeInOutQuad(t) {
          if ((t /= 1 / 2) < 1) return (1 / 2) * t * t;
          return (-1 / 2) * (--t * (t - 2) - 1);
        },
        easeInCubic(t) {
          return t * t * t;
        },
        easeOutCubic(t) {
          return 1 * ((t = t / 1 - 1) * t * t + 1);
        },
        easeInOutCubic(t) {
          if ((t /= 1 / 2) < 1) return (1 / 2) * t * t * t;
          return (1 / 2) * ((t -= 2) * t * t + 2);
        },
        easeInQuart(t) {
          return t * t * t * t;
        },
        easeOutQuart(t) {
          return -1 * ((t = t / 1 - 1) * t * t * t - 1);
        },
        easeInOutQuart(t) {
          if ((t /= 1 / 2) < 1) return (1 / 2) * t * t * t * t;
          return (-1 / 2) * ((t -= 2) * t * t * t - 2);
        },
        easeInQuint(t) {
          return 1 * (t /= 1) * t * t * t * t;
        },
        easeOutQuint(t) {
          return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
        },
        easeInOutQuint(t) {
          if ((t /= 1 / 2) < 1) return (1 / 2) * t * t * t * t * t;
          return (1 / 2) * ((t -= 2) * t * t * t * t + 2);
        },
        easeInSine(t) {
          return -1 * Math.cos((t / 1) * (Math.PI / 2)) + 1;
        },
        easeOutSine(t) {
          return 1 * Math.sin((t / 1) * (Math.PI / 2));
        },
        easeInOutSine(t) {
          return (-1 / 2) * (Math.cos((Math.PI * t) / 1) - 1);
        },
        easeInExpo(t) {
          return t === 0 ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
        },
        easeOutExpo(t) {
          return t === 1 ? 1 : 1 * (-Math.pow(2, (-10 * t) / 1) + 1);
        },
        easeInOutExpo(t) {
          if (t === 0) return 0;
          if (t === 1) return 1;
          if ((t /= 1 / 2) < 1) return (1 / 2) * Math.pow(2, 10 * (t - 1));
          return (1 / 2) * (-Math.pow(2, -10 * --t) + 2);
        },
        easeInCirc(t) {
          if (t >= 1) return t;
          return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
        },
        easeOutCirc(t) {
          return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
        },
        easeInOutCirc(t) {
          if ((t /= 1 / 2) < 1) return (-1 / 2) * (Math.sqrt(1 - t * t) - 1);
          return (1 / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
        easeInElastic(t) {
          let s = 1.70158;
          let p = 0;
          let a = 1;
          if (t === 0) return 0;
          if ((t /= 1) === 1) return 1;
          if (!p) p = 1 * 0.3;
          if (a < Math.abs(1)) {
            a = 1;
            s = p / 4;
          } else s = (p / (2 * Math.PI)) * Math.asin(1 / a);
          return -(
            a *
            Math.pow(2, 10 * (t -= 1)) *
            Math.sin(((t * 1 - s) * (2 * Math.PI)) / p)
          );
        },
        easeOutElastic(t) {
          let s = 1.70158;
          let p = 0;
          let a = 1;
          if (t === 0) return 0;
          if ((t /= 1) === 1) return 1;
          if (!p) p = 1 * 0.3;
          if (a < Math.abs(1)) {
            a = 1;
            s = p / 4;
          } else s = (p / (2 * Math.PI)) * Math.asin(1 / a);
          return (
            a *
              Math.pow(2, -10 * t) *
              Math.sin(((t * 1 - s) * (2 * Math.PI)) / p) +
            1
          );
        },
        easeInOutElastic(t) {
          let s = 1.70158;
          let p = 0;
          let a = 1;
          if (t === 0) return 0;
          if ((t /= 1 / 2) === 2) return 1;
          if (!p) p = 1 * (0.3 * 1.5);
          if (a < Math.abs(1)) {
            a = 1;
            s = p / 4;
          } else s = (p / (2 * Math.PI)) * Math.asin(1 / a);
          if (t < 1) {
            return (
              -0.5 *
              (a *
                Math.pow(2, 10 * (t -= 1)) *
                Math.sin(((t * 1 - s) * (2 * Math.PI)) / p))
            );
          }
          return (
            a *
              Math.pow(2, -10 * (t -= 1)) *
              Math.sin(((t * 1 - s) * (2 * Math.PI)) / p) *
              0.5 +
            1
          );
        },
        easeInBack(t) {
          const s = 1.70158;
          return 1 * (t /= 1) * t * ((s + 1) * t - s);
        },
        easeOutBack(t) {
          const s = 1.70158;
          return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
        },
        easeInOutBack(t) {
          let s = 1.70158;
          if ((t /= 1 / 2) < 1) {
            return (1 / 2) * (t * t * (((s *= 1.525) + 1) * t - s));
          }
          return (1 / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
        },
        easeInBounce(t) {
          return 1 - animationOptions.easeOutBounce(1 - t);
        },
        easeOutBounce(t) {
          if ((t /= 1) < 1 / 2.75) {
            return 1 * (7.5625 * t * t);
          } else if (t < 2 / 2.75) {
            return 1 * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75);
          } else if (t < 2.5 / 2.75) {
            return 1 * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375);
          }
          return 1 * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
        },
        easeInOutBounce(t) {
          if (t < 1 / 2) return animationOptions.easeInBounce(t * 2) * 0.5;
          return animationOptions.easeOutBounce(t * 2 - 1) * 0.5 + 1 * 0.5;
        }
      };

      // Variables global to the chart
      const width = context.canvas.width;
      const height = context.canvas.height;

      // High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
      if (window.devicePixelRatio) {
        context.canvas.style.width = `${width}px`;
        context.canvas.style.height = `${height}px`;
        context.canvas.height = height * window.devicePixelRatio;
        context.canvas.width = width * window.devicePixelRatio;
        context.scale(window.devicePixelRatio, window.devicePixelRatio);
      }

      this.Bar = function(data, options) {
        chart.Bar.defaults = {
          scaleOverlay: false,
          scaleOverride: false,
          scaleSteps: null,
          scaleStepWidth: null,
          scaleStartValue: null,
          scaleLineColor: "rgba(0,0,0,.1)",
          scaleLineWidth: 1,
          scaleShowLabels: true,
          scaleLabel: "<%=value%>",
          scaleFontFamily: "'Arial'",
          scaleFontSize: 12,
          scaleFontStyle: "normal",
          scaleFontColor: "#666",
          scaleShowGridLines: true,
          scaleGridLineColor: "rgba(0,0,0,.05)",
          scaleGridLineWidth: 1,
          barShowStroke: true,
          barStrokeWidth: 2,
          barValueSpacing: 5,
          barDatasetSpacing: 1,
          animation: false,
          animationSteps: 60,
          animationEasing: "easeOutQuart",
          onAnimationComplete: null
        };
        const config = options
          ? mergeChartConfig(chart.Bar.defaults, options)
          : chart.Bar.defaults;

        return new Bar(data, config, context);
      };

      const clear = function(c) {
        c.clearRect(0, 0, width, height);
      };

      var Bar = function(data, config, ctx) {
        let maxSize,
          scaleHop,
          calculatedScale,
          labelHeight,
          scaleHeight,
          valueBounds,
          labelTemplateString,
          valueHop,
          widestXLabel,
          xAxisLength,
          yAxisPosX,
          xAxisPosY,
          barWidth,
          rotateLabels = 0;

        calculateDrawingSizes();

        valueBounds = getValueBounds();
        console.log(`---valueBounds>${valueBounds}`);
        // Check and set the scale
        labelTemplateString = config.scaleShowLabels ? config.scaleLabel : "";
        if (!config.scaleOverride) {
          calculatedScale = calculateScale(
            scaleHeight,
            valueBounds.maxSteps,
            valueBounds.minSteps,
            valueBounds.maxValue,
            valueBounds.minValue,
            labelTemplateString
          );
        } else {
          calculatedScale = {
            steps: config.scaleSteps,
            stepValue: config.scaleStepWidth,
            graphMin: config.scaleStartValue,
            labels: []
          };
          populateLabels(
            labelTemplateString,
            calculatedScale.labels,
            calculatedScale.steps,
            config.scaleStartValue,
            config.scaleStepWidth
          );
        }

        scaleHop = Math.floor(scaleHeight / calculatedScale.steps);
        calculateXAxisSize();
        animationLoop(config, drawScale, drawBars, ctx);

        function drawBars(animPc) {
          ctx.lineWidth = config.barStrokeWidth;
          for (let i = 0; i < data.datasets.length; i++) {
            ctx.fillStyle = data.datasets[i].fillColor;
            ctx.strokeStyle = data.datasets[i].strokeColor;
            for (let j = 0; j < data.datasets[i].data.length; j++) {
              const barOffset =
                yAxisPosX +
                config.barValueSpacing +
                valueHop * j +
                barWidth * i +
                config.barDatasetSpacing * i +
                config.barStrokeWidth * i;

              ctx.beginPath();
              ctx.moveTo(barOffset, xAxisPosY);
              ctx.lineTo(
                barOffset,
                xAxisPosY -
                  animPc *
                    calculateOffset(
                      data.datasets[i].data[j],
                      calculatedScale,
                      scaleHop
                    ) +
                  config.barStrokeWidth / 2
              );
              ctx.lineTo(
                barOffset + barWidth,
                xAxisPosY -
                  animPc *
                    calculateOffset(
                      data.datasets[i].data[j],
                      calculatedScale,
                      scaleHop
                    ) +
                  config.barStrokeWidth / 2
              );
              ctx.lineTo(barOffset + barWidth, xAxisPosY);
              if (config.barShowStroke) {
                ctx.stroke();
              }
              ctx.closePath();
              ctx.fill();
            }
          }
        }
        function drawScale() {
          // X axis line
          ctx.lineWidth = config.scaleLineWidth;
          ctx.strokeStyle = config.scaleLineColor;
          ctx.beginPath();
          ctx.moveTo(width - widestXLabel / 2 + 5, xAxisPosY);
          ctx.lineTo(width - widestXLabel / 2 - xAxisLength - 5, xAxisPosY);
          ctx.stroke();

          if (rotateLabels > 0) {
            ctx.save();
            ctx.textAlign = "right";
          } else {
            ctx.textAlign = "center";
          }
          ctx.fillStyle = config.scaleFontColor;
          for (let i = 0; i < data.labels.length; i++) {
            ctx.save();
            if (rotateLabels > 0) {
              ctx.translate(
                yAxisPosX + i * valueHop,
                xAxisPosY + config.scaleFontSize
              );
              ctx.rotate(-(rotateLabels * (Math.PI / 180)));
              ctx.fillText(data.labels[i], 0, 0);
              ctx.restore();
            } else {
              ctx.fillText(
                data.labels[i],
                yAxisPosX + i * valueHop + valueHop / 2,
                xAxisPosY + config.scaleFontSize + 3
              );
            }

            ctx.beginPath();
            ctx.moveTo(yAxisPosX + (i + 1) * valueHop, xAxisPosY + 3);

            // Check i isnt 0, so we dont go over the Y axis twice.
            ctx.lineWidth = config.scaleGridLineWidth;
            ctx.strokeStyle = config.scaleGridLineColor;
            ctx.lineTo(yAxisPosX + (i + 1) * valueHop, 5);
            ctx.stroke();
          }

          // Y axis
          ctx.lineWidth = config.scaleLineWidth;
          ctx.strokeStyle = config.scaleLineColor;
          ctx.beginPath();
          ctx.moveTo(yAxisPosX, xAxisPosY + 5);
          ctx.lineTo(yAxisPosX, 5);
          ctx.stroke();

          ctx.textAlign = "right";
          ctx.textBaseline = "middle";
          for (let j = 0; j < calculatedScale.steps; j++) {
            ctx.beginPath();
            ctx.moveTo(yAxisPosX - 3, xAxisPosY - (j + 1) * scaleHop);
            if (config.scaleShowGridLines) {
              ctx.lineWidth = config.scaleGridLineWidth;
              ctx.strokeStyle = config.scaleGridLineColor;
              ctx.lineTo(
                yAxisPosX + xAxisLength + 5,
                xAxisPosY - (j + 1) * scaleHop
              );
            } else {
              ctx.lineTo(yAxisPosX - 0.5, xAxisPosY - (j + 1) * scaleHop);
            }

            ctx.stroke();
            if (config.scaleShowLabels) {
              ctx.fillText(
                calculatedScale.labels[j],
                yAxisPosX - 8,
                xAxisPosY - (j + 1) * scaleHop
              );
            }
          }
        }
        function calculateXAxisSize() {
          let longestText = 1;
          // if we are showing the labels
          if (config.scaleShowLabels) {
            ctx.font = `${config.scaleFontStyle} ${config.scaleFontSize}px ${
              config.scaleFontFamily
            }`;
            for (let i = 0; i < calculatedScale.labels.length; i++) {
              const measuredText = ctx.measureText(calculatedScale.labels[i])
                .width;
              longestText =
                measuredText > longestText ? measuredText : longestText;
            }
            // Add a little extra padding from the y axis
            longestText += 10;
          }
          xAxisLength = width - longestText - widestXLabel;
          valueHop = Math.floor(xAxisLength / data.labels.length);

          barWidth =
            (valueHop -
              config.scaleGridLineWidth * 2 -
              config.barValueSpacing * 2 -
              (config.barDatasetSpacing * data.datasets.length - 1) -
              ((config.barStrokeWidth / 2) * data.datasets.length - 1)) /
            data.datasets.length;

          yAxisPosX = width - widestXLabel / 2 - xAxisLength;
          xAxisPosY = scaleHeight + config.scaleFontSize / 2;
        }
        function calculateDrawingSizes() {
          maxSize = height;

          // Need to check the X axis first - measure the length of each text metric, and figure out if we need to rotate by 45 degrees.
          ctx.font = `${config.scaleFontStyle} ${config.scaleFontSize}px ${
            config.scaleFontFamily
          }`;
          widestXLabel = 1;
          for (let i = 0; i < data.labels.length; i++) {
            const textLength = ctx.measureText(data.labels[i]).width;
            // If the text length is longer - make that equal to longest text!
            widestXLabel =
              textLength > widestXLabel ? textLength : widestXLabel;
          }
          if (width / data.labels.length < widestXLabel) {
            rotateLabels = 45;
            if (
              width / data.labels.length <
              Math.cos(rotateLabels) * widestXLabel
            ) {
              rotateLabels = 90;
              maxSize -= widestXLabel;
            } else {
              maxSize -= Math.sin(rotateLabels) * widestXLabel;
            }
          } else {
            maxSize -= config.scaleFontSize;
          }

          // Add a little padding between the x line and the text
          maxSize -= 5;

          labelHeight = config.scaleFontSize;

          maxSize -= labelHeight;
          // Set 5 pixels greater than the font size to allow for a little padding from the X axis.

          scaleHeight = maxSize;

          // Then get the area above we can safely draw on.
        }
        function getValueBounds() {
          let upperValue = Number.MIN_VALUE;
          let lowerValue = Number.MAX_VALUE;
          for (let i = 0; i < data.datasets.length; i++) {
            for (let j = 0; j < data.datasets[i].data.length; j++) {
              if (data.datasets[i].data[j] > upperValue) {
                upperValue = data.datasets[i].data[j];
              }
              if (data.datasets[i].data[j] < lowerValue) {
                lowerValue = data.datasets[i].data[j];
              }
            }
          }

          const maxSteps = Math.floor(scaleHeight / (labelHeight * 0.66));
          const minSteps = Math.floor((scaleHeight / labelHeight) * 0.5);

          return {
            maxValue: upperValue,
            minValue: lowerValue,
            maxSteps,
            minSteps
          };
        }
      };

      function calculateOffset(val, calculatedScale, scaleHop) {
        const outerValue = calculatedScale.steps * calculatedScale.stepValue;
        const adjustedValue = val - calculatedScale.graphMin;
        const scalingFactor = CapValue(adjustedValue / outerValue, 1, 0);
        return scaleHop * calculatedScale.steps * scalingFactor;
      }

      function animationLoop(config, drawScale, drawData, ctx) {
        let animFrameAmount = config.animation
            ? 1 / CapValue(config.animationSteps, Number.MAX_VALUE, 1)
            : 1,
          easingFunction = animationOptions[config.animationEasing],
          percentAnimComplete = config.animation ? 0 : 1;

        if (typeof drawScale !== "function") drawScale = function() {};

        requestAnimFrame(animLoop);

        function animateFrame() {
          const easeAdjustedAnimationPercent = config.animation
            ? CapValue(easingFunction(percentAnimComplete), null, 0)
            : 1;
          clear(ctx);
          if (config.scaleOverlay) {
            drawData(easeAdjustedAnimationPercent);
            drawScale();
          } else {
            drawScale();
            drawData(easeAdjustedAnimationPercent);
          }
        }
        function animLoop() {
          // We need to check if the animation is incomplete (less than 1), or complete (1).
          percentAnimComplete += animFrameAmount;
          animateFrame();
          // Stop the loop continuing forever
          if (percentAnimComplete <= 1) {
            requestAnimFrame(animLoop);
          } else if (typeof config.onAnimationComplete === "function") {
            config.onAnimationComplete();
          }
        }
      }

      // Declare global functions to be called within this namespace here.

      // shim layer with setTimeout fallback
      var requestAnimFrame = (function() {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          }
        );
      })();

      function calculateScale(
        drawingHeight,
        maxSteps,
        minSteps,
        maxValue,
        minValue,
        labelTemplateString
      ) {
        let graphMin,
          graphMax,
          graphRange,
          stepValue,
          numberOfSteps,
          valueRange,
          rangeOrderOfMagnitude,
          decimalNum;

        valueRange = maxValue - minValue;

        rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange);

        graphMin =
          Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) *
          Math.pow(10, rangeOrderOfMagnitude);

        graphMax =
          Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) *
          Math.pow(10, rangeOrderOfMagnitude);

        graphRange = graphMax - graphMin;

        stepValue = Math.pow(10, rangeOrderOfMagnitude);

        numberOfSteps = Math.round(graphRange / stepValue);

        // Compare number of steps to the max and min for that size graph, and add in half steps if need be.
        while (numberOfSteps < minSteps || numberOfSteps > maxSteps) {
          if (numberOfSteps < minSteps) {
            stepValue /= 2;
            numberOfSteps = Math.round(graphRange / stepValue);
          } else {
            stepValue *= 2;
            numberOfSteps = Math.round(graphRange / stepValue);
          }
        }

        const labels = [];
        populateLabels(
          labelTemplateString,
          labels,
          numberOfSteps,
          graphMin,
          stepValue
        );

        return {
          steps: numberOfSteps,
          stepValue,
          graphMin,
          labels
        };

        function calculateOrderOfMagnitude(val) {
          return Math.floor(Math.log(val) / Math.LN10);
        }
      }

      // Populate an array of all the labels by interpolating the string.
      function populateLabels(
        labelTemplateString,
        labels,
        numberOfSteps,
        graphMin,
        stepValue
      ) {
        if (labelTemplateString) {
          // Fix floating point errors by setting to fixed the on the same decimal as the stepValue.
          for (let i = 1; i < numberOfSteps + 1; i++) {
            labels.push(
              tmpl(labelTemplateString, {
                value: (graphMin + stepValue * i).toFixed(
                  getDecimalPlaces(stepValue)
                )
              })
            );
          }
        }
      }

      // Max value from array
      function Max(array) {
        return Math.max(...array);
      }
      // Min value from array
      function Min(array) {
        return Math.min(...array);
      }
      // Default if undefined
      function Default(userDeclared, valueIfFalse) {
        if (!userDeclared) {
          return valueIfFalse;
        }
        return userDeclared;
      }
      // Is a number function
      function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
      // Apply cap a value at a high or low number
      function CapValue(valueToCap, maxValue, minValue) {
        if (isNumber(maxValue)) {
          if (valueToCap > maxValue) {
            return maxValue;
          }
        }
        if (isNumber(minValue)) {
          if (valueToCap < minValue) {
            return minValue;
          }
        }
        return valueToCap;
      }
      function getDecimalPlaces(num) {
        let numberOfDecimalPlaces;
        if (num % 1 !== 0) {
          return num.toString().split(".")[1].length;
        }
        return 0;
      }

      function mergeChartConfig(defaults, userDefined) {
        const returnObj = {};
        for (var attrname in defaults) {
          returnObj[attrname] = defaults[attrname];
        }
        for (var attrname in userDefined) {
          returnObj[attrname] = userDefined[attrname];
        }
        return returnObj;
      }

      // Javascript micro templating by John Resig - source at http://ejohn.org/blog/javascript-micro-templating/
      const cache = {};

      function tmpl(str, data) {
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        const fn = !/\W/.test(str)
          ? (cache[str] =
              cache[str] || tmpl(document.getElementById(str).innerHTML))
          : // Generate a reusable function that will serve as a template generator (and which will be cached).
            new Function(
              "obj",
              `${"var p=[],print=function(){p.push.apply(p,arguments);};" +
                // Introduce the data as local variables using with(){}
                "with(obj){p.push('"}${
                // Convert the template into pure JavaScript
                str
                  .replace(/[\r\t\n]/g, " ")
                  .split("<%")
                  .join("\t")
                  .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                  .replace(/\t=(.*?)%>/g, "',$1,'")
                  .split("\t")
                  .join("');")
                  .split("%>")
                  .join("p.push('")
                  .split("\r")
                  .join("\\'")
              }');}return p.join('');`
            );

        // Provide some basic currying to the user
        return data ? fn(data) : fn;
      }
    };
    const fillColor =
      this.props.options && this.props.options.fillColor
        ? this.props.options.fillColor
        : "#FF0000";
    const strokeColor =
      this.props.options && this.props.options.strokeColor
        ? this.props.options.strokeColor
        : "#FF0000";
    const chartData = {
      labels: this.props.xLabels,
      datasets: [
        {
          fillColor,
          strokeColor,
          data: this.props.yValues
        }
      ]
    };
    const ctx = this.histoCanvas.getContext("2d");
    const chartOptions = { animation: false, animationSteps: 10 };
    new Chart(ctx).Bar(chartData, chartOptions);
  }
}

export default Histogram;
