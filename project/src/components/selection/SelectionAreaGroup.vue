<template>
  <div>
      <div class="t-select-group" ref="group">
      <div class="t-select-item" v-for="(v,k) in group" :key="k">
        <selection-area :list="v.list" :multiple="v.multiple" :keyName="k"
          :isSearch="v.isSearch" :textAlign="v.textAlign" :width="width" 
          :title="v.title" @change-item="changeItem"/>  
      </div>
    </div>
    <div class="t-select-footer">
       <button class="btn-primary" @click="resetSelectGroup()">清除筛选</button>
        <button @click="confirm()">确定</button>
    </div>
  </div>
</template>
<script>
import SelectionArea from './SelectionArea'
export default {
  name:'SelectionAreaGroup',
  props:{
    keyList:{//需要展示的key数组
      type:Array,
      default:function(){
        return []
      }
    },
    groupList:{
      type:Array,
      default:function(){
        return []
      }
    },
    isLevel:{//各个列表是否是层级关系
      type:Boolean,
      default:false
    }
  },
  components:{
    SelectionArea
  },
  data() {
    return {
      width:250,
      group:{},
      
    }
  },
  beforeMount(){
    this.resetSelectGroup();
  },
  mounted(){
    this.setItemWidth()
  },
  methods: {
    setItemWidth(){
      let offsetWidth = this.$refs.group.offsetWidth;
      this.width = Math.floor( ( 1 / this.keyList.length - 0.01 ) * offsetWidth );
    },
    resetSelectGroup(){
      this.clearGroup();
      this.handleGroup();
    },
    confirm(){
      let hasSelectList = [];
      this.keyList.map( value => {
        this.group[value.name].list.map( item => {
          if( item.isSelect ){
            hasSelectList.push(item)
          }
        })
      })
      this.$emit('all-select',{list:hasSelectList})
    },
    handleGroup(){
      this.keyList.map( v => {
        let list =[...new Set( this.groupList.map( value => value[v.name] ))];
        let obj = {
          multiple:v.multiple,
          textAlign:v.textAlign,
          isSearch:v.isSearch,
          title:v.title,
          list:list.map( value => {
            return { [v.name]:value }
          })
        }
        this.$set(this.group, v.name, obj);
      })
    },
    clearGroup(){
      this.keyList.map( v => {
        this.$set(this.group,v.name,{})
      })
    },
    changeItem(data){
      let {key, list} = data;
      if(this.isLevel){
        let index = this.keyList.findIndex( value => key === value.name);
        if( index < 0 || index === this.keyList.length -1 ){
          return;
        }
        this.clearNextAllList(index)
        let nextKey = this.keyList[index+1].name;//下一个列表
        let str = list.map( value => value[key]).join("");
        let arr = [];
        this.groupList.map( value => {
          if( str.includes(value[key]) ){
            let index = arr.findIndex( item => item[nextKey] === value[nextKey] )
            if(index < 0){//列表去重
              arr.push( { [nextKey] : value[nextKey]} )
            }
          }
        })
        this.group[nextKey].list = arr
      }
    },
    clearNextAllList(index){
      for(let i=index+1; i<this.keyList.length; i++){
        let key = this.keyList[i].name;
        this.group[key].list = []
      }
    },
  },
}
</script>
<style lang="less" scoped>
.t-select-group {
  display: flex;
  justify-content: space-between;
}
.t-select-footer {
  margin: 25px 0;
  button {
    margin-right: 30px;
  } 
}
</style>