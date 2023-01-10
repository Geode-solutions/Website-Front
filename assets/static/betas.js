import dfn from '@/static/techno/dfn.jpg'
import corbi from '@/static/techno/corbi.gif'
import fractures from '@/static/techno/fractures.png'
import repair from '@/static/techno/repair.png'
import incremental from '@/static/techno/incremental.png'
import validity_checker from '@/static/techno/validity_checker.svg'

const betas_list = [
  {
    title: '2D/3D triangular remeshing',
    image: dfn,
    text: 'Remeshing of 2D and 3D triangulated surfaces, \
              targeting both triangle equilaterality and user input mesh sizes.',
    features: [
      'Robust to degenerated input meshes',
      'Guaranteed conformal to surface intersections',
    ],
    readiness: '95',
  },
  {
    title: '3D tetrahedral meshing',
    image: corbi,
    text: 'Tetrahedral mesh generation from a set of triangulated surfaces, \
              targeting both tetrahedron regularity and user input mesh sizes.',
    features: [
      'Robust to degenerated input meshes',
      'Guaranteed conformal to input boundary surface meshes',
    ],
    readiness: '90',
  },
  {
    title: 'Conversion between model and mesh',
    image: fractures,
    text: 'Handy tools to convert mesh to boundary representation and boundary representation to mesh.',
    features: [
      'Automatic recovery of model components and topology from mesh',
      'Output mesh gathering all model information as attributes',
    ],
    readiness: '95',
  },
  {
    title: 'Watertight model sealing',
    image: repair,
    text: 'Repair and build a boundary representation which ensure the watertightness. \
              This property is key to guarantee model integrity, topological requests validity and conformal meshing.',
    features: [
      'Remove all gaps and intersections between surfaces',
      'Compute watertight model components and topology',
      'Guaranteed full conformal meshes with all model components',
    ],
    readiness: '40',
  },
  {
    title: 'Incremental surface-based modeling',
    image: incremental,
    text: 'Build a boundary representation from an independent set of surfaces in an extreme robust way.',
    features: [
      'Produce surface to surface intersections and topology',
      'Interactive surface addition and removal from the model',
      'Guaranteed model validity at any time',
    ],
    readiness: '80',
  },
  {
    title: 'Mesh/model validity checker',
    image: validity_checker,
    text: 'Before doing any computation or meshing step, make sure your data satisfy your needs. \
              Meshes can be degenerated, non-manifold, colocated and boundary representations can have \
              topological issues. This checker tracks and exposes all flawed configurations from your data.',
    features: [
      'Track any topological issues in your model',
      'Track geometrical problems in your meshes, including colocated points, non-manifold or degeneration issues, and polygon adjacencies problems.',
    ],
    readiness: '90'
  }
]

export default betas_list