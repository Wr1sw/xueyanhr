<template>
    <div>
        <div>
            <el-input
                    size="small"
                    class="addTraInput"
                    v-loading="loading"
                    style="width: 200px"
                    element-loading-text="正在加载..."
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    placeholder="添加培训..."
                    prefix-icon="el-icon-plus"
                    @keydown.enter.native="addTrain"
                    v-model="train.name">
            </el-input>
            <el-input v-model="train.content" placeholder="培训内容" size="small"
                      style="margin-left: 5px;margin-right: 5px; width: 300px"></el-input>
            <el-input v-model="train.beginDate" placeholder="开始时间" size="small"
                      style="margin-left: 5px;margin-right: 5px; width: 170px"></el-input>
            <el-input v-model="train.endDate" placeholder="结束时间" size="small"
                      style="margin-left: 5px;margin-right: 5px; width: 170px"></el-input>
            <el-button icon="el-icon-plus" size="small" type="primary" @click="addTrain">添加</el-button>
        </div>
        <div class="TraManaMain">
            <el-table
                    :data="trains"
                    border
                    @selection-change="handleSelectionChange"
                    size="small"
                    stripe
                    style="width: 70%">
<!--                <el-table-column-->
<!--                        type="selection"-->
<!--                        width="55">-->
<!--                </el-table-column>-->
                <el-table-column
                        prop="id"
                        label="编号"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="培训名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="content"
                        width="150"
                        label="培训内容">
                </el-table-column>
                <el-table-column
                        prop="beginDate"
                        width="150"
                        label="开始时间">
                </el-table-column>
                <el-table-column
                        prop="endDate"
                        width="150"
                        label="结束时间">
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
<!--            <el-button @click="deleteMany" type="danger" size="small" style="margin-top: 8px"-->
<!--                       :disabled="multipleSelection.length==0">批量删除-->
<!--            </el-button>-->
        </div>
        <el-dialog
                title="修改信息"
                :visible.sync="dialogVisible"
                width="30%">
            <div>
                <div>
                    <el-tag>培训名称</el-tag>
                    <el-input class="updateTraInput" size="small" v-model="updateTra.name"></el-input>
                </div>
                <div>
                    <el-tag>培训内容</el-tag>
                    <el-input class="updateTraInput" size="small" v-model="updateTra.content"></el-input>
                </div>
                <div>
                    <el-tag>开始时间</el-tag>
                    <el-input class="updateTraInput" size="small" v-model="updateTra.beginDate"></el-input>
                </div>
                <div>
                    <el-tag>结束时间</el-tag>
                    <el-input class="updateTraInput" size="small" v-model="updateTra.endDate"></el-input>
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
    export default {
        name: "TraMana",
        data() {
            return {
                train: {
                    name: '',
                    content:'',
                    beginDate:'',
                    endDate:''
                },
                dialogVisible: false,
                loading: false,
                updateTra: {
                    name: '',
                    content:'',
                    beginDate:'',
                    endDate:''
                },
                multipleSelection: [],
                trains: []
            }
        },
        mounted() {
            this.initTrain();
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
                    this.deleteRequest("/system/cfg/train/" + ids).then(resp => {
                        if (resp) {
                            this.initTrain();
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
            addTrain() {
                if (this.train.name && this.train.content && this.train.beginDate && this.train.endDate) {
                    this.postRequest("/system/cfg/train/", this.train).then(resp => {
                        if (resp) {
                            this.initTrain();
                            this.train.name = '';
                        }
                    })
                } else {
                    this.$message.error('信息不可以为空');
                }
            },
            showEditView(index, data) {
                Object.assign(this.updateTra, data);
                this.dialogVisible = true;
            },
            doUpdate() {
                this.putRequest("/system/cfg/train/", this.updateTra).then(resp => {
                    if (resp) {
                        this.initTrain();
                        this.updateTra.name = '';
                        this.dialogVisible = false;
                    }
                })
            },
            handleDelete(index, data) {
                this.$confirm('此操作将永久删除【' + data.name + '】培训内容, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/cfg/train/" + data.id).then(resp => {
                        if (resp) {
                            this.initTrain();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            initTrain() {
                this.loading = true;
                this.getRequest("/system/cfg/train/").then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.trains = resp;
                    }
                })
            }
        }
    }
</script>

<style>
    .addPosInput {
        width: 300px;
        margin-right: 8px
    }

    .updatePosInput {
        width: 200px;
        margin-left: 8px;
    }

    .posManaMain {
        margin-top: 10px;
    }
</style>