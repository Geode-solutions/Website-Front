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
        title: 'Implicit',
        to: '/workflows/implicit',
        text: 'Generate a BRep from your inputs, then remesh a Section extracted from it',
        badge: 'beta',
        chip: '',
    },
    {
        icon: 'mdi-resize',
        title: 'Simplex',
        to: '/workflows/simplex',
        text: 'Adjust the mesh size in your model, specific blocks and surfaces can be targeted',
        badge: 'beta',
        chip: '',
    },
    {
        icon: 'mdi-vector-combine',
        title: 'Explicit',
        to: '/workflows/explicit',
        text: 'Combine different meshes and models into a unique merged model',
        badge: 'beta',
        chip: '',
    },
]

export default workflows_list
