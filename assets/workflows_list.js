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
        to: '/workflows/simplex',
        text: 'Adjust the mesh size in your model, specific blocks and surfaces can be targeted',
        badge: '',
        chip: '',
    },
    {
        icon: 'mdi-vector-combine',
        title: 'Explicit Modeling',
        to: '/workflows/explicit',
        text: 'Combine different meshes and models into a unique merged model',
        badge: '',
        chip: '',
    },
]

export default workflows_list
