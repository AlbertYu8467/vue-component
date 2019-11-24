import HelloWorld from '@/components/HelloWorld'
import SelectionDemo from '@/components/SelectionDemo'
const routes = [
  {
    path:'',
    redirect:'/HelloWorld'
  },
  {
    name:'HelloWorld',
    path:'/HelloWorld',
    component:HelloWorld
  },
  {
    name:'SelectionDemo',
    path:'/SelectionDemo',
    component:SelectionDemo
  },
]
export default routes
