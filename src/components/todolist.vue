<template>
<div>
    <md-field>
      <label>添加事项</label>
      <md-input v-model="title" @keyup.enter="addItem"></md-input>
    </md-field>

    <div class="big">
        <md-tabs class="md-transparent" md-alignment="fixed">
            <!--显示所有-->
            <md-tab id="tab-home" md-label="ALL">
                <md-toolbar md-elevation="0" v-for="(item,index) in  sortItems" x>
                    <a @click="item.isUrgent = !item.isUrgent;init();changeState(item)" href="#"  v-if="item.isUrgent">
                        <i class="material-icons urgent" >get_app</i>
                    </a>
                    <a @click="item.isUrgent = !item.isUrgent;init();changeState(item)" href="#" v-if="!item.isUrgent">
                        <i class="material-icons urgent" >publish</i>
                    </a>

                    <md-checkbox v-model="item.finished" @change="changeState(item)"></md-checkbox>
                    <div class="md-list-item-text">
                        <span v-if="!isupdate" :class="[{finished:item.finished},{urgentstyle:item.isUrgent}]" >{{ item.title }}</span>
                        <md-field v-if="isupdate" style="width:100px;">
                            <md-input  @keyup.enter="isupdate = false;changeState(item)"  v-model="item.title"></md-input>
                        </md-field>
                    </div>

                    <div>
                        <md-datepicker  v-model="item.date"></md-datepicker>
                    </div>
                    
                    <div class="btn-inline">
                        <md-button class="md-raised md-primary" @click="isupdate = !isupdate;changeState(item)">EDIT</md-button>
                        <md-button class="md-raised" @click="deleteItem(item.title)">DELETE</md-button>
                    </div>
                </md-toolbar>
            </md-tab>
            <!--显示所有 End-->

            <!--显示已完成-->
            <md-tab id="tab-pages" md-label="FINISHED">
                <md-toolbar md-elevation="0" v-for="(item,index) in items" v-if="item.finished === true">
                    <a @click="item.isUrgent = !item.isUrgent;init();changeState(item)" href="#"  v-if="item.isUrgent">
                        <i class="material-icons urgent" >get_app</i>
                    </a>
                    <a @click="item.isUrgent = !item.isUrgent;init();changeState(item)" href="#" v-if="!item.isUrgent">
                        <i class="material-icons urgent" >publish</i>
                    </a>
                    <md-checkbox v-model="item.finished" @click="changeState(item)" ></md-checkbox>
                    <div class="md-list-item-text">
                        <span v-if="!isupdate" :class="[{finished:item.finished},{urgentstyle:item.isUrgent}]">{{ item.title }}</span>
                        <md-field v-if="isupdate" style="width:100px;">
                            <md-input  @keyup.enter="isupdate = false;changeState(item)"  v-model="item.title"></md-input>
                        </md-field>
                         
                    </div>
                    <div> <md-datepicker v-model="item.date"></md-datepicker></div>
                    <div class="btn-inline">
                        <md-button class="md-raised md-primary" @click="isupdate = !isupdate;changeState(item)">EDIT</md-button>
                        <md-button class="md-raised" @click="deleteItem(item.title)">DELETE</md-button>
                    </div>
                </md-toolbar>
            </md-tab>
            <!--显示已完成 End -->

            <!--显示未完成-->
            <md-tab id="tab-posts" md-label="UNFINISHED">
                <md-toolbar md-elevation="0" v-for="(item,index) in items" v-if="item.finished === false">
                <a @click="item.isUrgent = !item.isUrgent;init();changeState(item)" href="#"  v-if="item.isUrgent">
                    <i class="material-icons urgent" >get_app</i>
                </a>
                <a @click="item.isUrgent = !item.isUrgent;init();changeState(item)" href="#" v-if="!item.isUrgent">
                    <i class="material-icons urgent" >publish</i>
                </a>
                <md-checkbox v-model="item.finished" @change="changeState(item)"></md-checkbox>
                    <div class="md-list-item-text">
                        <span v-if="!isupdate":class="[{finished:item.finished},{urgentstyle:item.isUrgent}]">{{item.title}}</span>
                        <md-field v-if="isupdate" style="width:100px;">
                            <md-input  @keyup.enter="isupdate = false;changeState(item)"  v-model="item.title"></md-input>
                        </md-field>
                    </div>
                    <div> <md-datepicker v-model="item.date"></md-datepicker></div>
                    <div class="btn-inline">
                        <md-button class="md-raised md-primary" @click="isupdate = !isupdate;changeState(item)">EDIT</md-button>
                        <md-button class="md-raised" @click="deleteItem(item.title)">DELETE</md-button>
                    </div>
                </md-toolbar>
            </md-tab>
            <!--显示未完成-->

            <!--按时间排序-->
            <!-- <md-tab id="tab-favorites" md-label="Sort">
                <md-toolbar md-elevation="0" v-for="(item,index) in sortItems">
                    <a @click="item.isUrgent = !item.isUrgent;init();changeState(item)" href="#"  v-if="item.isUrgent">
                        <i class="material-icons urgent" >get_app</i>
                    </a>
                    <a @click="item.isUrgent = !item.isUrgent;init();changeState(item)" href="#" v-if="!item.isUrgent">
                        <i class="material-icons urgent" >publish</i>
                    </a>
                    <md-checkbox v-model="item.finished" @change="changeState(item)"></md-checkbox>
                    <div class="md-list-item-text">
                        <span v-if="!isupdate">{{item.title}}</span>
                        <md-field v-if="isupdate" style="width:100px;">
                            <md-input  @keyup.enter="isupdate = false;changeState(item)"  v-model="item.title"></md-input>
                        </md-field>
                    </div>
                    <div> <md-datepicker v-model="item.date"></md-datepicker></div>
                    <div class="btn-inline">
                        <md-button class="md-raised md-primary" @click="isupdate = !isupdate;changeState(item)">EDIT</md-button>
                        <md-button class="md-raised" @click="deleteItem(item.title)">DELETE</md-button>
                    </div>
                </md-toolbar>
            </md-tab> -->
        </md-tabs>
    </div>
    <!--按时间排序 End-->
</div>
</template>

<script>
import bus from '../assets/bus'

var sortbyDate = (array) => {
    array.sort((a, b) => {
        return a.date > b.date
    })
    return array;
}
export default {
    data() {
        return {
            title: '',
            listName: 'all',
            showDialog: false,
            isupdate: false,
            items: []
        }
    },
    computed: {
        storeitems() {
            return this.$store.getters.items;
        },
        sortItems() {
            var thisitems = this.items;
            return sortbyDate(thisitems);
        }
    },
    created() {
        // created生命周期，在实例已经创建完成，页面还没渲染时调用init方法。
        this.init();
    },
    methods: {
        init() {
            if (this.listName === 'all') {
                this.items = this.$store.getters.items;
            }else if(this.listName === 'urgent'){
                this.items = this.$store.getters.getUrgentItems;
            }else{
                this.items = this.$store.getters.getListsByName(this.listName);
            }
        },
        addItem() {
            let newItem = {
                title: this.title,
                date: new Date(),
                belong: this.listName,
                remarks: '',
                finished: false,
                isUrgent:false
            }
            this.$store.commit('addItem', newItem);
            this.init();
            this.title = ''
        },
        deleteItem(text) {
          this.$store.commit('deleteItem', text);
          this.init();
        },
        changeState(item){
            this.$store.commit('editItem', item);
        }
    },
    mounted() {
        var self = this;
        bus.$on('toname', function(msg) {
            self.listName = msg;
            self.init()
        });
    }
}
</script>

<style>
.big{
    max-height: 450px;
}

.urgent{
    margin-right: 10px;
    color: red;
}


.btn-inline{
    margin-left: 10px;
}
.urgentstyle{
    color: red;
    font-weight: bolder;
}
.finished{
    text-decoration: line-through;
    color:grey;
    font-weight: 200;

}
@media(min-width:1200px) {
    .btn-inline{
        margin-left: 100px;
    }
}

@media(max-width:765px) {
    .md-datepicker{
        display: none;
    }
    .btn-inline{
        margin-left: 0px;
    }
}
</style>
