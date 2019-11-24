<template>
  <selection-area-group :isLevel="true" :groupList="groupList" :keyList="keyList" @all-select="allSelect" />
</template>
<script>
import SelectionAreaGroup from '@/components/selection/SelectionAreaGroup'
export default {
  name:'SelectionDemo',
  components:{
    SelectionAreaGroup
  },
  data() {
    return {
      keyList:[
        {name:'country',multiple:true,textAlign:'center',"isSearch":true,"title":'国家'},
        {name:'province',multiple:true,textAlign:'center',"isSearch":true,"title":'省份'},
        {name:'city',multiple:true,textAlign:'center',"isSearch":true, "title":'城市'},
      ],
      groupList:[
        { country:'中国', province:"湖北", city:"武汉"},
        { country:'中国', province:"湖北", city:"荆州"},
        { country:'中国', province:"湖北", city:"襄阳"},
        { country:'中国', province:"广东", city:"广州"},
        { country:'中国', province:"广东", city:"深圳"},
        { country:'中国', province:"广东", city:"东莞"},
        { country:'中国', province:"福建", city:"福州"},
        { country:'中国', province:"福建", city:"厦门"},
        { country:'中国', province:"福建", city:"泉州"},
        { country:'美国', province:"俄亥俄州", city:"哥伦布"},
        { country:'美国', province:"宾夕法尼亚州", city:"哈里斯堡"},
        { country:'美国', province:"加利福尼亚", city:"奥克兰"},
        { country:'美国', province:"加利福尼亚", city:"弗里蒙特"},
        { country:'美国', province:"加利福尼亚", city:"伯克利"},
        { country:'英国', province:"英格兰", city:"伦敦"},
        { country:'英国', province:"苏格兰", city:"伯明翰"},
        { country:'英国', province:"英格兰", city:"谢菲尔德"},
      ]
    }
  },
  methods: {
    allSelect(list){
      console.log('demo', list);
    }
  },
}
</script>
<style scoped lang="less">

</style>