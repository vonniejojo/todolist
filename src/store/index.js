import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import VueLocalStorage from 'vue-localstorage'
import { stat } from 'fs';
Vue.use(VueLocalStorage)

const STOR_LISTS = 'lists'
const STOR_ITEMS = 'items'
const USERS = 'users'
const IS_LOGIN = 'islogin'


const state = {
    lists: JSON.parse(window.localStorage.getItem(STOR_LISTS) || '[]'),
    items: JSON.parse(window.localStorage.getItem(STOR_ITEMS) || '[]'),
    users: JSON.parse(window.localStorage.getItem(USERS) || '[]'),
    islogin: window.localStorage.getItem(IS_LOGIN),

}
const getters = {
  lists: state => state.lists,
  items: state => state.items,
  users: state => state.users,
  islogin: state => state.islogin,
  getListsByName: state => title => {
    let thisitems = [];
    var downitems = state.items.find(item => {
        if (item.belong == title){
          thisitems.push(item)
        }
      });
    return thisitems;
  },
  getcountbyname: state => name => {
    let thisitems = [];
    var downitems = state.items.find(item => {
      if (item.belong == name){
        thisitems.push(item)
      }
    });
    let count = thisitems.filter((data) => {
      if (data.finished === false) return true;
      return false;
    }).length
    return count;
  },
  getAllCount:state => {
      let count = state.items.filter((item) => {
          if(item.finished === false)return true;
          return false;
      }).length;
      return count;
  },
  getUrgentCount: state => {
      let thisitems = [];
      var downitems = state.items.find(item => {
          if(item.isUrgent === true){
              thisitems.push(item)
          }
      });
      let count = thisitems.filter((data)=>{
          if(data.finished === false ) return true;
          return false;
      }).length
      return count;
  },
  getUrgentItems:state => {
      let thisitems = [];
      state.items.forEach((item) => {
          if(item.isUrgent === true){
              thisitems.push(item);
          }
      });
      return thisitems;
  }
}
const mutations = {
  addList(state, obj) {
    var s = state.lists.find(list => list.name == obj.name)
    if(!s){
      var list = {
        name: obj.name,
        count: 0,
        isDelete: false
      }
      state.lists.push(list);
    }
  },
  addItem(state, obj) {
    var item = {
      title: obj.title,
      finished: false,
      date: obj.date,
      belong: obj.belong,
      remarks: obj.remarks,
      isUrgent:false,
      isEdit:false
    }
    state.items.push(item);
  },
  deleteItem(state, title) {
    state.items.splice(state.items.findIndex(item => item.title == title), 1)
  },
  deleteList(state,name){
    state.items.splice(state.items.findIndex(item => item.belong == name), 1)
    state.lists.splice(state.lists.findIndex(list => list.name == name), 1)
  },
  addUser(state, obj) {
    var username = obj.username;
    var password = obj.password;
    state.users.push({username: username,password: password})
  },
  setLogin (state, islogin) {
    state.islogin = islogin;
  },
  changeFinishState(state,title){
      var i = state.items.findIndex(item => item.title == title);
      state.items[i].finished = !state.items[i].finished;      
  },
  editItem(state, item){

  }
}

const localStoragePlugin = store => {
  store.subscribe((mutation, { lists,items,islogin}) => {
    window.localStorage.setItem(STOR_LISTS, JSON.stringify(lists))
    window.localStorage.setItem(STOR_ITEMS, JSON.stringify(items))
    window.localStorage.setItem(IS_LOGIN, islogin)
  })
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  plugins: [localStoragePlugin]
})
