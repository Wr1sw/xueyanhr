<template>
    <div>
        <div style="margin-top: 10px;display: flex;justify-content: center">
            <el-input v-model="keywords" placeholder="通过用户名搜索用户..." prefix-icon="el-icon-search"
                      style="width: 400px;margin-right: 10px" @keydown.enter.native="doSearch"></el-input>
            <el-button icon="el-icon-search" type="primary" @click="doSearch">搜索</el-button>
        </div>

<!--        <div>-->
            <el-button @click="editAndAddMaterial()">新增管理员</el-button>
<!--        </div>-->

        <div class="hr-container">
            <el-card class="hr-card" v-for="(hr,index) in hrs" :key="index">
                <div slot="header" class="clearfix">
                    <span>{{hr.name}}</span>
                    <el-button style="float: right; padding: 3px 0;color: #e30007;" type="text"
                               icon="el-icon-delete" @click="deleteHr(hr)"></el-button>
                </div>
                <div>
                    <div class="img-container">
                        <img :src="hr.userface" :alt="hr.name" :title="hr.name" class="userface-img">
                    </div>

                    <div class="userinfo-container">
                        <div>用户名：{{hr.name}}</div>
                        <div>username：{{hr.username}}</div>
                        <div>手机号码：{{hr.phone}}</div>
                        <div>电话号码：{{hr.telephone}}</div>
                        <div>地址：{{hr.address}}</div>
                        <div>用户状态：
                            <el-switch
                                    v-model="hr.enabled"
                                    active-text="启用"
                                    @change="enabledChange(hr)"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    inactive-text="禁用">
                            </el-switch>
                        </div>
                        <div>用户角色：
                            <el-tag type="success" style="margin-right: 4px" v-for="(role,indexj) in hr.roles"
                                    :key="indexj">{{role.nameZh}}
                            </el-tag>
                            <el-popover
                                    placement="right"
                                    title="角色列表"
                                    @show="showPop(hr)"
                                    @hide="hidePop(hr)"
                                    width="200"
                                    trigger="click">
                                <el-select v-model="selectedRoles" multiple placeholder="请选择">
                                    <el-option
                                            v-for="(r,indexk) in allroles"
                                            :key="indexk"
                                            :label="r.nameZh"
                                            :value="r.id">
                                    </el-option>
                                </el-select>
                                <el-button slot="reference" icon="el-icon-more" type="text"></el-button>
                            </el-popover>
                        </div>
                        <div>备注：{{hr.remark}}
                            <el-button type="danger" size="small" style="margin-left: 150px;margin-top: 10px"
                                        @click="editAndAddMaterial(hr)">编辑个人信息</el-button>
                        </div>

                    </div>
                </div>
            </el-card>

        </div>
<!--        <div>-->
            <el-dialog
                :title="dialogTitle"
                :visible.sync="dialogVisible"
                width="30%">
                <div >
                    <table>
                        <tr>
                            <td><el-tag>用户名：</el-tag></td>
                            <td><el-input size="small" @input="change($event)" style="margin-left: 5px" v-model="updatehr.name"></el-input></td>
                        </tr>
                        <tr>
                            <td><el-tag>手机号码：</el-tag></td>
                            <td>
                                <el-input size="small" @input="change($event)" style="margin-left: 5px" v-model="updatehr.phone"></el-input> </td>
                        </tr>
                        <tr>
                            <td><el-tag>电话号码：</el-tag></td>
                            <td><el-input size="small" @input="change($event)" style="margin-left: 5px" v-model="updatehr.telephone"></el-input> </td>
                        </tr>
                        <tr>
                            <td><el-tag>地址：</el-tag></td>
                            <td><el-input size="small" @input="change($event)" style="margin-left: 5px" v-model="updatehr.address"></el-input> </td>
                        </tr>
                    </table>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="dialogVisible = false">取消</el-button>
                    <el-button size="small" type="primary" @click="dochange">确定</el-button>
                </span>
            </el-dialog>
        </div>
<!--    </div>-->
</template>

<script>
    export default {
        name: "SysHr",
        data() {
            return {
                dialogVisible:false,
                dialogTitle: '',
                ifMaterialEdit: 0,
                keywords: '',
                hrs: [],
                selectedRoles: [],
                allroles: [],
                hrbasic:{
                    name:'',
                    phone:'',
                    telephone:'',
                    address:'',
                    enabled:''
                },
                updatehr:{
                    name:'',
                    phone:'',
                    telephone:'',
                    address:'',
                    enabled:''
                },
                Visible: false
            }
        },
        mounted() {
            this.initHrs();
        },
        methods: {
            deleteHr(hr) {
                this.$confirm('此操作将永久删除【'+hr.name+'】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/hr/"+hr.id).then(resp=>{
                        if (resp) {
                            this.initHrs();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            doSearch() {
                this.initHrs();
            },
            change(){
                this.$forceUpdate();
            },
            dochange(){
                console.log(this.ifMaterialEdit);
                console.log(this.updatehr);
                if(this.ifMaterialEdit == 1){
                    this.doApp();
                }else if(this.ifMaterialEdit == 0){
                    this.doUpdate();
                }
            },
            doApp(){
                this.updatehr.enabled = true;
                console.log(22+this.updatehr);
                this.postRequest("/system/hr/", this.updatehr).then(resp =>{
                    if(resp){
                        this.initHrs();
                        this.dialogVisible = false;
                    }
                })
            },
            editAndAddMaterial(data){
              if (data){
                  this.ifMaterialEdit = 0;
                  this.dialogVisible = true;
                  this.dialogTitle = '编辑基本信息';
                  this.showEditView(data);
              }else{
                  this.ifMaterialEdit = 1;
                  this.dialogVisible = true;
                  this.dialogTitle = '新增基本信息';
                  // this.hrbasic = '';
                  this.updatehr = this.hrbasic;
              }
            },
            doUpdate(){
              this.putRequest("/system/hr/", this.updatehr).then(resp =>{
                  console.log(this.updatehr);
                    if(resp){
                        this.initHrs();
                        this.dialogVisible = false;
                    }
              })
            },
            hidePop(hr) {
                let roles = [];
                Object.assign(roles, hr.roles);
                let flag = false;
                if (roles.length != this.selectedRoles.length) {
                    flag = true;
                } else {
                    for (let i = 0; i < roles.length; i++) {
                        let role = roles[i];
                        for (let j = 0; j < this.selectedRoles.length; j++) {
                            let sr = this.selectedRoles[j];
                            if (role.id == sr) {
                                roles.splice(i, 1);
                                i--;
                                break;
                            }
                        }
                    }
                    if (roles.length != 0) {
                        flag = true;
                    }
                }
                if (flag) {
                    let url = '/system/hr/role?hrid=' + hr.id;
                    this.selectedRoles.forEach(sr => {
                        url += '&rids=' + sr;
                    });
                    console.log(url);
                    this.putRequest(url).then(resp => {
                        if (resp) {
                            this.initHrs();
                        }
                    });
                }
            },
            showPop(hr) {
                this.initAllRoles();
                let roles = hr.roles;
                this.selectedRoles = [];
                roles.forEach(r => {
                    this.selectedRoles.push(r.id);
                })
            },
            showEditView(data){
                console.log(11);
                Object.assign(this.updatehr, data);
                console.log(this.updatehr);
                this.dialogVisible = true;
            },
            enabledChange(hr) {
                delete hr.roles;
                this.putRequest("/system/hr/", hr).then(resp => {
                    if (resp) {
                        this.initHrs();
                    }
                })
            },
            initAllRoles() {
                this.getRequest("/system/hr/roles").then(resp => {
                    if (resp) {
                        this.allroles = resp;
                    }
                })
            },
            initHrs() {
                this.getRequest("/system/hr/?keywords="+this.keywords).then(resp => {
                    if (resp) {
                        this.hrs = resp;
                    }
                })
            }
        }
    }
</script>

<style>
    .userinfo-container div {
        font-size: 12px;
        color: #409eff;
    }

    .userinfo-container {
        margin-top: 20px;
    }

    .img-container {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .userface-img {
        width: 72px;
        height: 72px;
        border-radius: 72px;
    }

    .hr-container {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .hr-card {
        width: 350px;
        margin-bottom: 20px;
    }
</style>