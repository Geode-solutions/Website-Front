import integration from '@/static/services/integration.jpg'
import idea from '@/static/services/idea.webp'
import success from '@/static/services/success.webp'
import pencil from '@/static/services/pencil.jpg'

const services_list = [
  {
    title: 'OpenGeode integration',
    image: integration,
    text: 'You would like to use OpenGeode environment, features and technologies within another software suite. \
            You are used to specific code and you need its features in an OpenGeode extension. \
            We offer you the possibility to integrate OpenGeode ecosystem, and your code, through other platform plugins.',
  },
  {
    title: 'Prototyping/Code development',
    image: idea,
    text: 'You need a technical solution to solve a dedicated problem. \
            You have precise needs on software development and features. \
            We propose you our skills and experience to design and develop \
            your solution from a working prototype to a full featured product.',
  },
  {
    title: 'Expertise and Consulting',
    image: success,
    text: 'You have specific questions or needs on meshing tasks or existing tools. \
              Our experts advices and skills will allow you to reach your objectives faster.',
  },
  {
    title: 'Education',
    image: pencil,
    text: 'You need to learn how to work with OpenGeode platform and our products. \
              You ask for courses on modeling and meshing or on software development. \
              We can build together custom training program designed from your needs.',
  },
]

export default services_list