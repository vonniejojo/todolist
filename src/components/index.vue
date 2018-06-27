<template>
  <div class="page-container">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <!--搜索弹出框-->
    <!--样式！！！！！！！！！！！！！！！！-->
    <md-dialog :md-active.sync="showsearch" style="width: 60%">

      <md-toolbar class="md-primary">
        <div class="md-toolbar-section-start">
          <h1 class="md-title">事项搜索</h1> 
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by record..." v-model="searchinfo" @input="searchOnTable" />
        </md-field>
      </md-toolbar>

      <md-table v-model="searched" md-card style="width: 100%;height:100%">
        <md-table-empty-state
          md-label="No Record found"
          :md-description="`没有记录发现通过 '${searchinfo}' 索引. 请尝试其他不同的关键字`">
          <md-button class="md-primary md-raised" @click="showsearch = false">去创建事项</md-button>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="名称" md-sort-by="title" md-numeric>{{ item.title }}</md-table-cell>
            <md-table-cell md-label="备注" md-sort-by="remarks">{{ item.remarks }}</md-table-cell>
            <md-table-cell md-label="时间" md-sort-by="date">{{ item.date }}</md-table-cell>
            <md-table-cell md-label="列表" md-sort-by="belong">{{ item.belong }}</md-table-cell>
            <md-table-cell md-label="是否完成" md-sort-by="finished">{{ item.finished }}</md-table-cell>
        </md-table-row>
      </md-table>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showsearch = false">OK</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!--搜索弹出框End-->

    <md-app>
      <!--topbar-->
      <md-app-toolbar class="md-primary topbar" :class="{topbar2:active}" >
        <!--汉堡按钮-->
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <i class="material-icons">menu</i>
        </md-button>

        <span class="md-title">TODOLIST</span>
        <div class="changestyle">
          <i class="material-icons" @click="activeChange">bookmark</i>
        </div>

        <div class="app-search">
          <input @input="searchOnTable" v-model="searchinfo" @keyup.enter="showsearch = true" type="text" class="form-control" placeholder="Search for..." />
          <i class="material-icons app-search-btn" @click="showsearch = true">search</i>
        </div>

      </md-app-toolbar>
      <!--topbar End-->

      <!--left sidebar-->
      <md-app-drawer :md-active.sync="menuVisible" md-persistent="full" style="width:280px">

        <md-toolbar class="md-transparent" md-elevation="0">
          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <i class="material-icons blue">arrow_back</i>
            </md-button>
          </div>
        </md-toolbar>

        <div>
          <img src="../assets/images/1.jpg" class="pic" >
          <md-menu md-size="medium" md-align-trigger>
            <md-button md-menu-trigger class="drop-btn">Tess</md-button>
            <md-menu-content>
              <md-menu-item @click="logout"><i class="material-icons">power_settings_new</i>Log Out</md-menu-item>
              <md-menu-item><i class="material-icons">settings</i>Settings</md-menu-item>
            </md-menu-content>
          </md-menu>
          
          <md-list class="sidebar-title" >
            <md-list-item>
              <span class="md-list-item-text">TODOLIST</span>
            </md-list-item>

            <md-list-item class="sidebar-item">
              <i class="material-icons" style="margin-right:10px;color:orange">account_balance_wallet</i>
              <a href="#" class="md-list-item-text" @click="changeList('all')">ALL TODOS <div class="unfinishcount">{{ $store.getters.getAllCount }}</div></a>
            </md-list-item>
            
            <md-list-item class="sidebar-item">
              <i class="material-icons" style="margin-right:10px;color:red;opvacity:0.8">grade</i>
              <a href="#" class="md-list-item-text" @click="changeList('urgent')">UEGENT <div class="unfinishcount"> {{ $store.getters.getUrgentCount }} </div></a>
            </md-list-item>

            <md-list-item v-for="list in lists" class="temp sidebar-item">
              <i class="material-icons">storage</i>
              <a href="#" class="md-list-item-text" @click="changeList(list.name)">{{ list.name }} <div class="unfinishcount"> {{ $store.getters.getcountbyname(list.name) }}</div></a>
            </md-list-item>
          </md-list>
          
           <div class="sidebar-bottom">
              <md-toolbar class="md-transparent">
                <md-field style="width:200px;">
                  <label>添加清单</label>
                  <md-input v-model="name" @keyup.enter="addList"></md-input>
                </md-field>
                <md-button class="md-icon-button md-raised" @click="addList">+</md-button>
              </md-toolbar>
          </div>
        </div>
      </md-app-drawer>
      <!--left sidebar End-->

      <!--main-wrapper-->
      <md-app-content>
        <div>
            <todolist></todolist>
        </div>
      </md-app-content>
      <!--main-wrapper结束-->
    </md-app>

  </div>
</template>

<script>
import todolist from './todolist'
import bus from '../assets/bus'

const toLower = text => {
  return text.toString().toLowerCase()
}

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.title).includes(toLower(term)))
  }
  return items
}

export default {
  data(){
    return{
      menuVisible: false,
      name:'',
      isadd: false,
      showsearch: false,
      searchinfo: '',
      searched: [],
      active:false
    }
  },
  components:{
    todolist
  },
  computed:{
    lists(){
      return this.$store.getters.lists;
    },
    items() {
      return this.$store.getters.items;
    },
    islogin() {
      return this.$store.getters.islogin;
    }
  },
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    },
    addList(){
      this.$store.commit('addList',{name:this.name});
      this.name = '';
    },
    changeList(name){
       bus.$emit('toname', name)
    },
    searchOnTable () {
      this.searched = searchByName(this.items, this.searchinfo)
    },
    logout(){
      this.$store.commit('setLogin',false);
      this.$router.push('/');
    },
    activeChange(){
      this.active = !this.active;
    }
  }

}
</script>

<style scoped>
  .md-app {
    min-height: 600px;
    border: 1px solid rgba(#000, .12);
  }
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
  .md-checkbox {
    display: flex;
  }
  .page-container{
    width:80%;
    height:700px;
    margin:50px auto;
  }

  .topbar{
     height: 80px;
     background: #009efb;
     /* Old browsers */
     background: -moz-linear-gradient(left, #0178bc 0%, #00bdda 100%);
     /* FF3.6-15 */
     background: -webkit-linear-gradient(left, #0178bc 0%, #00bdda 100%);
     /* Chrome10-25,Safari5.1-6 */
     background: linear-gradient(to right, #0178bc 0%, #00bdda 100%);
     /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  }
  .topbar2{
    height: 80px;
    background: #f62d51;
    /* Old browsers */
    background: -moz-linear-gradient(left, #f62d51 0%, #660fb5 100%);
    /* FF3.6-15 */
    background: -webkit-linear-gradient(left, #f62d51 0%, #660fb5 100%);
    /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right, #f62d51 0%, #660fb5 100%);
    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  }
 

  /*topbar*/

  .md-title{
    position: fixed;
    left:50px;
  }
  .app-search{
    position: absolute; right: 40px; top: 30px 
  }
  .app-search input{
    width:200px;
    border-radius:100px;
    color: rgba(#000, .12);
    padding:5px;
    height: 30px;
  }
  .app-search-btn{
    position: absolute;
    top:5px;
    right: 16px;
    color: #009efb;
    opacity: 0.8;
  }

  .blue{
    color: #0178bc;
    
  }
  .changestyle{
    position: fixed;
    left: 180px;
    top:28px;
  }
  /*topbar*/

  /*sidebar*/
  .pic{
    width:55px;
    border-radius:100%;
    position: relative;
    top:-45px;
    margin-left: 20px;
  }
  .drop-btn{
    position: relative;
    top:-30px;
  }
  .sidebar-title{
    position: relative;
    top: -30px;
  }
  .sidebar-item{
    border-left: 2px solid #009efb;
    color: #0178bc;
  }
  .sidebar-bottom{
    position: fixed;
    bottom: 2px;
  }
  .temp i{
    margin-right: 10px;
    color: #00bdda;
  }
  .unfinishcount{
    position:absolute;
    left:240px;
    top:15px;
    background-color:grey;
    border-radius: 50%;
    width: 15px;
    opacity: 0.5;
    color: white;
    padding-left: 3px;
  }
  /***********字体样式可能需要改进***********/

  /*sidebar End*/


 @media(max-width: 400px) {
   .app-search{
     display: none;
   }
 }
 @media(max-width:765px) {
    .page-container{
      width:100%;
      height:800px;
    }

  }
  
</style>
