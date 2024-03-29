<template>
  <div ref="wordCloud" class="wordCloud" />
</template>

<script>
  import * as d3 from "d3"
  import cloud from "d3-cloud"

  export default {
    props: {
      data: {
        type: Array,
        required: true,
      },
      fontSizeMapper: {
        type: Function,
        required: true,
      },
      onWordClick: {
        type: Function,
        default: (word) => {
          window.alert(`You clicked ${word.text}`)
        },
      },
      rotate: {
        type: [Function, String, Number],
        default: 0,
      },
      font: {
        type: [String, Function],
        default: "Serif",
      },
      width: {
        type: [Number, String],
        default: 960,
      },
      height: {
        type: [Number, String],
        default: 500,
      },
      padding: {
        type: [Number, String],
        default: 0,
      },
      spiral: {
        type: String,
        default: "archimedean",
      },
      coloring: {
        type: String,
        default: "random",
      },
    },
    data() {
      return {
        layout: {},
        chart: {},
        fill: null,
      }
    },

    mounted() {
      this.createCanvas()
    },

    methods: {
      createCanvas: function () {
        const wordCounts = this.data.map((text) => ({ ...text }))

        d3.select(this.$el).selectAll("*").remove()

        const layout = cloud()
          .size([this.width, this.height])
          .words(wordCounts)
          .padding(this.padding)
          .spiral(this.spiral)
          .rotate(this.rotate)
          .font(this.font)
          .fontSize(this.fontSizeMapper)
          .on("end", this.end)

        this.fill = d3.scaleOrdinal(["#00897B", "#26A69A", "#80CBC4"])

        layout.start()
      },
      end: function (words) {
        let _fill
        switch (this.coloring) {
          case "random":
            _fill = (d, i) => this.fill(i)
            break
          case "size":
            _fill = (d) => this.fill(d.size)
            break
          default:
            _fill = (d, i) => this.fill(i)
        }

        d3.select(this.$el)
          .append("svg")
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("viewBox", "0, 0, " + this.width + ", " + this.height)
          .attr("preserveAspectRatio", "xMidYMid meet")
          .append("g")
          .attr("transform", `translate(${this.width / 2},${this.height / 2})`)
          .selectAll("text")
          .data(words)
          .enter()
          .append("text")
          .style("font-family", (d) => d.font)
          .style("font-size", (d) => {
            return `${d.size}px`
          })
          .style("fill", _fill)
          .attr("text-anchor", "middle")
          .attr("transform", (d) => {
            return `translate(${[d.x, d.y]})rotate(${d.rotate})`
          })
          .text((d) => d.text)
          .on("click", (d) => this.onWordClick(d))
      },
    },
  }
</script>
