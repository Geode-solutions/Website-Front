import { defineStore } from 'pinia'

export const useInputStore = defineStore('inputs', {
    state: () => ({ 
        constraints: [], 
        isovalues: [], 
        axis: 0, 
        coordinate: 0, 
        metric: 0,
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
        setAxis(x) {
            this.axis = x
        },
        setCoordinate(x) {
            this.coordinate = x
        },
        setMetric(x) {
            this.metric = x
        },
        setGlobalMetric(x) {
            this.globalMetric[0] = x
        },
        setSurfaceMetric(x,id) {
            this.surfaceMetrics[id] = x
        },
        setBlockMetric(x,id) {
            this.blockMetrics[id] = x
        }
    },  
})
