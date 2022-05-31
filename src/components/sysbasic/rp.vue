<template>
    <div>
        <div>
            <el-input
                    size="small"
                    class="addPosInput"
                    v-loading="loading"
                    element-loading-text="正在加载..."
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    placeholder="添加奖惩规则..."
                    prefix-icon="el-icon-plus"
                    @keydown.enter.native="addRp"
                    v-model="rp.detail">
            </el-input>
            <el-input v-model="rp.result" placeholder="奖惩金额" size="small"
                      style="margin-left: 5px;margin-right: 5px"></el-input>
            <el-select v-model="rp.ecType" placeholder="奖罚选择" size="small"
                      style="margin-left: 5px;margin-right: 5px"><el-option
                    v-for="item in ecTypes"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>

            </el-select>
            <el-button icon="el-icon-plus" size="small" type="primary" @click="addRp">添加</el-button>
        </div>
        <div class="rpManaMain">
            <el-table
                    :data="rps"
                    border
                    @selection-change="handleSelectionChange"
                    size="small"
                    stripe
                    style="width: 70%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="detail"
                        label="奖惩规则"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="ecType"
                        width="120"
                        label="奖/惩">
                </el-table-column>
                <el-table-column
                        prop="result"
                        width="150"
                        label="奖惩金额">
                </el-table-column>

<!--                <el-table-column-->
<!--                        label="是否启用">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-tag size="small" type="success" v-if="scope.row.enabled">已启用</el-tag>-->
<!--                        <el-tag size="small" type="danger" v-else>未启用</el-tag>-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="showEditView(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button @click="deleteMany" type="danger" size="small" style="margin-top: 8px"
                       :disabled="multipleSelection.length==0">批量删除
            </el-button>
        </div>
        <el-dialog
                title="修改规则"
                :visible.sync="dialogVisible"
                width="30%">
            <div>
                <div>
                    <el-tag>奖惩规则</el-tag>
                    <el-input class="updateRpInput" size="small" v-model="updateRp.detail"></el-input>
                </div>
                <div>
                    <el-tag>奖惩金额</el-tag>
                    <el-input class="updateRpInput" size="small" v-model="updateRp.result"></el-input>
                </div>

<!--                <div>-->
<!--                    <el-tag>是否启用</el-tag>-->
<!--                    <el-switch-->
<!--                            v-model="updatePos.enabled"-->
<!--                            active-text="启用"-->
<!--                            inactive-text="禁用">-->
<!--                    </el-switch>-->
<!--                </div>-->
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
    <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "RpMana",
        data() {
            return {
                rp: {
                    detail: '',
                    result: '',
                    ecType: ''
                },
                dialogVisible: false,
                loading: false,
                updateRp: {
                    detail: '',
                    result: '',
                    ecType: ''
                },
                multipleSelection: [],
                rps: [],
                ecTypes:[
                    "奖",
                    "罚"
                ]
            }
        },
        mounted() {
            this.initRp();
        },
        methods: {
            deleteMany() {
                this.$confirm('此操作将永久删除【' + this.multipleSelection.length + '】条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item => {
                        ids += 'ids=' + item.id + '&';
                    })
                    this.deleteRequest("/system/cfg/rp/" + ids).then(resp => {
                        if (resp) {
                            this.initRp();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            addRp() {
                if (this.rp.detail && this.rp.result && this.rp.ecType) {
                    if (this.rp.ecType == '奖'){
                        this.rp.ecType = 1;
                    }else {
                        this.rp.ecType = 0;
                    }
                    // axios({
                    //     url:"/rp/add",
                    //     method: "post",
                    //     params:{
                    //         detail:this.rp.detail,
                    //         result:this.rp.result
                    //     }
                    // }).then(resp =>{
                    //     if (resp) {
                    //         this.initRp();
                    //         this.rp.detail = '';
                    //     }
                    // })
                    this.postRequest("/system/cfg/rp/", this.rp).then(resp => {
                        console.log(this.rp);
                        if (resp) {
                            this.initRp();
                            this.rp.detail = '';
                        }
                    })
                } else {
                    this.$message.error('奖惩规则不可以为空');
                }
            },
            showEditView(index, data) {
                Object.assign(this.updateRp, data);
                this.dialogVisible = true;
            },
            doUpdate() {
                // axios({
                //     url: "/rp/update",
                //     method: "post",
                //     params: {
                //         detail:this.updateRp.detail,
                //         result:this.updateRp.result
                //     }
                // }).then(resp =>{
                //     if (resp) {
                //         this.initRp();
                //         this.updateRp.detail = '';
                //         this.dialogVisible = false;
                //     }
                // })
                this.putRequest("/system/cfg/rp/", this.updateRp).then(resp => {
                    if (resp) {
                        this.initRp();
                        this.updateRp.detail = '';
                        this.dialogVisible = false;
                    }
                })
            },
            handleDelete(index, data) {
                this.$confirm('此操作将永久删除【' + data.detail + '】规则, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/cfg/rp/" + data.id).then(resp => {
                        if (resp) {
                            this.initRp();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            initRp() {
                this.loading = true;
                this.getRequest("/system/cfg/rp/").then(resp => {
                    this.loading = false;
                    if (resp) {
                        // if (resp.data.rp.ecType == 1){
                        //     resp.data.rp.ecType = '奖';
                        // }else {
                        //     resp.data.rp.ecType = '惩';
                        // }
                        this.rps = resp;
                        // console.log(this.rps[0].detail)
                        var i = 0;
                        for(i;i < this.rps.length; i++){
                            if(this.rps[i].ecType == 1){
                                this.rps[i].ecType = '奖';
                            }else{
                                this.rps[i].ecType = '惩';
                            }
                        }
                    }
                })
            }
        }
    }
</script>

<style>
    .addRpInput {
        width: 300px;
        margin-right: 8px
    }

    .updateRpInput {
        width: 200px;
        margin-left: 8px;
    }

    .rpManaMain {
        margin-top: 10px;
    }
</style>