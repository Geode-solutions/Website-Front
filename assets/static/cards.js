import road from '@/static/opengeode/road.jpg'
import canyon from '@/static/opengeode/antelope-canyon.jpg'
import technique from '@/static/opengeode/technique.jpg'
import ruler from '@/static/opengeode/ruler.jpg'
import hands from '@/static/opengeode/hands.jpg'
import jet_engine from '@/static/opengeode/jet-engine.jpg'

const cards_list = [
  {
    title: 'Open source and cross-platform',
    image: road,
    text: 'OpenGeode is an open source C++ framework available on GitHub, \
              under a permissive software license (MIT). \
              We also provide pre-compiled releases on several platforms: \
              Windows and UNIX-based.',
  },
  {
    title: 'Geometric and geological models',
    image: canyon,
    text: 'OpenGeode offers a CAD framework dedicated to Geosciences with \
              data structures for meshes (wells, faults, horizons, 3D structured, \
              partially or fully unstructured meshes), and for boundary representations \
              organizing a rich set of relationships between geological features (structural \
              models, cross-sections).',
  },
  {
    title: 'Industrial quality',
    image: technique,
    text: 'A complete set of tools is used around OpenGeode to ensure its quality and its stability. \
              The Continuous Integration and Continuous Delivery philosophy has been chosen: code changes \
              are delivered more frequently, more reliably (high-leveled tests) and automatically, \
              using open-source GitHub tools.',
  },
  {
    title: 'Ease-of-use',
    image: ruler,
    text: 'OpenGeode is easy to read since its code intelligibility:\
              API librairies are heavily documented, classes and methods are meaningful named. \
              OpenGeode is easy to get and to compile.  Convenient and open-source tools will soon be associated to OpenGeode:\
              a Python-based scriptability framework for quick prototyping and \
              a web-based application using an innovative UI and modern technologies.',
  },
  {
    title: 'Extensibility',
    image: hands,
    text: 'OpenGeode supports users in adding new functionalities to allow easy adaptation to specific requirements. \
              We provide a quick start template to create your own technologies based on OpenGeode.',
  },
  {
    title: 'Efficiency',
    image: jet_engine,
    text: 'Modern concurrency and GPU-accelerated solutions are planned to be integrated to reach real-time computations. \
              We want to deliver turnkey powerful solutions for effective and immediate use.',
  },
]

export default cards_list