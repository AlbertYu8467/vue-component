<template>
  <div class="t-panel" :style="{width:`${width}px`,textAlign:textAlign}">
    <h4 v-if="title">{{title}}</h4>
    <input v-if="isSearch" v-model="searchText" placeholder="请输入关键字"/>
    <ul v-if="searchList.length">
      <li v-for="v in searchList" :class="v.isSelect ? 'active' : ''" :key="v[keyName]" @click="changeItem(v)">{{v[keyName]}}</li>
    </ul>
    <div class="t-no-data" v-else>
      没有匹配到数据！
    </div>
  </div>
</template>
<script>
export default {
  name:'SelectionArea',
  props:{
    list:{//列表
      type:Array,
    },
    title:{//列的标题
      type:String,
      default:""
    },
    keyName:{//展示的key
      type:String,
      default:"country",
    },
    width:{
      type:Number,
      default:250
    },
    textAlign:{
      type:String,
      default:"center"
    },
    multiple:{//是否多选
      type:Boolean,
      default:false
    },
    isSearch:{//是否需要搜索
      type:Boolean,
      default:true,
    },
  },
  computed:{
    warpList(){//重置list的状态,list改变
      this.list.map( value => this.$set(value,'isSelect',false));
      return this.list
    },
    searchList(){
      if(this.searchText === ""){
        return this.warpList
      }
      let regex = new RegExp(`${this.searchText}`,'i')//正则修饰符“g”会按lastIndex匹配
      let list = [];
      let keyName = this.keyName
      this.warpList.map( value => {
        regex.test(value[keyName]) && list.push(value)
      })
      return list;
    },
  },
  watch:{
    searchList(list){
      this.$emit('change-item',{key:this.keyName,list})
    }
  },
  data(){
    return {
      searchText:'',
    }
  },
  methods:{
    changeItem(v){
      this.multiple ? this.handleMultipleSelect(v): this.handleSingleSelect(v);
      let list = this.warpList.filter( value => value.isSelect)
      this.$emit('change-item',{key:this.keyName,list})
    },
    handleSingleSelect(v){
      let isSelect = v.isSelect;
      this.warpList.map( value => value.isSelect = false);
      v.isSelect = !isSelect;
    },
    handleMultipleSelect(v){
      v.isSelect = !v.isSelect;
    }
  }
}
</script>
<style lang="less" scoped>
.t-panel {
  color:#333;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  padding:10px; 
  h4{
    text-align: center;
    line-height:40px;
  }
  input {
    width: 80%;
    margin: 10px auto;
  }
  .t-no-data {
    height: 200px;
    line-height: 200px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  ul {
    height: 200px;
    overflow-y:scroll;
    overflow-x:hidden;  
    li {
      line-height: 40px;
      cursor: pointer;
      margin-bottom: 1px;
      background: #f3f0f0;
      text-indent: 10px;
    }
    li.active,li:hover {
      background :#efdfdf;
      color: #0097dd;
    }
  }
}
</style>