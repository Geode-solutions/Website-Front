import { defineStore } from 'pinia'

export const useInputStore = defineStore('inputs', {
    state: () => ({ 
        constraints: [], 
        isovalues: [], 
        bbox_points: [], 
        scalar_function: "",
        cellSize: [""], 
        axis: [""], 
        direction: [""], 
        metric: [""],
        surfaceMetrics: {}, 
        blockMetrics: {}, 
        globalMetric: [""]
    }),
    actions: {
        addConstraint(x) {
            this.constraints.push(x)
        },
        modifyConstraint(index,x) {
            this.constraints[index] = x
        },
        popConstraint() {
            this.constraints.pop()
        },
        addIsovalue(x) {
            this.isovalues.push(x)
        },
        modifyIsovalue(index,x) {
            this.isovalues[index] = x
        },
        popIsovalue() {
            this.isovalues.pop()
        },
        modifyBBoxPoints(x) {
            this.bbox_points[0] = x
        },
        setFunction(x) {
            this.scalar_function = x
        },
        setCellSize(x) {
            this.cellSize[0] = x
        },
        setAxis(x) {
            this.axis[0] = x  //weirdly not working when just defined as axis: "0"
        },
        setDirection(x) {
            this.direction[0] = x
        },
        setMetric(x) {
            this.metric[0] = x
        },
        setGlobalMetric(x) {
            this.globalMetric[0] = x
        },
        setSurfaceMetric(x,id) {
            this.surfaceMetrics[id] = x
        },
        setBlockMetric(x,id) {
            this.blockMetrics[id] = x
        },
        setDefault() {
            this.constraints = []
            this.isovalues = []
            this.bbox_points = [{x_min:"", y_min:"", z_min:"", x_max:"", y_max:"", z_max:""}]
            this.scalar_function = ""
            this.cellSize = [""]
            this.axis = [""]
            this.direction = [""]
            this.metric = [""]
            this.globalMetric = [""]
            this.surfaceMetrics = {}
            this.blockMetrics = {}
        }
    },  
})
