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
        title: 'Implicit modeling',
        short_title: 'Implicit',
        to: '/workflows/implicit',
        text: 'Generate an Implicit Structural Model from your data, extract a Section inside it and remesh it.',
        badge: 'beta',
        chip: '',
    },
    {
        icon: 'mdi-set-square',
        title: 'Tetrahedral meshing',
        short_title: 'Meshing',
        to: '/workflows/simplex',
        text: 'Adjust the mesh size in your model, both globally and by targeting specific surfaces.',
        badge: 'beta',
        chip: '',
    },
    {
        icon: 'mdi-vector-combine',
        title: 'Explicit modeling',
        short_title: 'Explicit',
        to: '/workflows/explicit',
        text: 'Intersect and combine several meshes and models into a unique model.',
        badge: 'beta',
        chip: '',
    },
]

export default workflows_list
