const workflows_list = [
    {
        icon: 'mdi-apps',
        title: 'Welcome',
        to: '/workflows',
        text: '',
        badge: '',
        chip: '',
    },
    {
        icon: 'mdi-earth-box',
        title: 'ONG',
        to: '/workflows/ong',
        text: 'Generate a BRep from your inputs, then remesh a Section extracted from it',
        badge: '',
        chip: '',
    },
    {
        icon: 'mdi-resize',
        title: 'Simplex Remesh',
        to: '/workflows/simplexRemesh',
        text: 'Adjust the mesh size in your model, individual blocks and surfaces can be targeted',
        badge: '',
        chip: '',
    },
    {
        icon: 'mdi-vector-combine',
        title: 'Explicit Modeling',
        to: '/workflows/explicitModeling',
        text: 'Combine meshes and models into a unique one',
        badge: '',
        chip: '',
    },
]

export default workflows_list
