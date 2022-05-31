<template>
    <div>
        <div>
            <el-input
                    size="small"
                    class="addkpiInput"
                    v-loading="loading"
                    element-loading-text="正在加载..."
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    placeholder="添加kpi规则..."
                    prefix-icon="el-icon-plus"
                    @keydown.enter.native="addKpi"
                    v-model="kpi.kpi">
            </el-input>
            <el-input v-model="kpi.maxScore" placeholder="最高分" size="small"
                      style="margin-left: 5px;margin-right: 5px"></el-input>
            <el-input v-model="kpi.minScore" placeholder="最低分" size="small"
                      style="margin-left: 5px;margin-right: 5px"></el-input>
            <el-button icon="el-icon-plus" size="small" type="primary" @click="addKpi">添加</el-button>
        </div>
        <div class="kpiManaMain">
            <el-table
                    :data="kpis"
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
                        prop="kpi"
                        label="kpi得分"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="max_score"
                        width="150"
                        label="最高分">
                </el-table-column>
                <el-table-column
                        prop="min_score"
                        width="150"
                        label="最低分">
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
                    <el-tag>kpi得分</el-tag>
                    <el-input class="updatekpiInput" size="small" v-model="updateKpi.kpi"></el-input>
                </div>
                <div>
                    <el-tag>最高分</el-tag>
                    <el-input class="updatekpiInput" size="small" v-model="updateKpi.maxScore"></el-input>
                </div>
                <div>
                    <el-tag>最低分</el-tag>
                    <el-input class="updatekpiInput" size="small" v-model="updateKpi.minScore"></el-input>
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
        name: "KpiMana",
        data() {
            return {
                kpi: {
                    kpi: '',
                    maxScore: '',
                    minScore: ''
                },
                dialogVisible: false,
                loading: false,
                updateKpi: {
                    kpi: '',
                    maxScore: '',
                    minScore: ''
                },
                multipleSelection: [],
                kpis: []
            }
        },
        mounted() {
            this.initKpi();
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
                    this.deleteRequest("/system/cfg/kpiscore/" + ids).then(resp => {
                        if (resp) {
                            this.initKpi();
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
            addKpi() {
                if (this.kpi.kpi && this.kpi.maxScore && this.kpi.minScore) {
                    // axios({
                    //     url:"/kpiscore/add",
                    //     method: "post",
                    //     params:{
                    //         kpi:this.kpi.kpi,
                    //         max_score:this.kpi.max_score,
                    //         min_score:this.kpi.min_score
                    //     }
                    // }).then(resp =>{
                    //     if (resp) {
                    //         this.initKpi();
                    //         this.kpi.kpi = '';
                    //     }
                    // })
                    this.postRequest("/system/cfg/kpiscore/", this.rp).then(resp => {
                        if (resp) {
                            this.initRp();
                            this.rp.detail = '';
                        }
                    })
                } else {
                    this.$message.error('kpi规则不可以为空');
                }
            },
            showEditView(index, data) {
                Object.assign(this.updateKpi, data);
                this.dialogVisible = true;
            },
            doUpdate() {
                // axios({
                //     url: "/kpiscore/update",
                //     method: "post",
                //     params: {
                //         kpi:this.kpi.kpi,
                //         max_score:this.kpi.max_score,
                //         min_score:this.kpi.min_score
                //     }
                // }).then(resp =>{
                //     if (resp) {
                //         this.initKpi();
                //         this.updateKpi.kpi = '';
                //         this.dialogVisible = false;
                //     }
                // })
                this.putRequest("/system/cfg/kpiscore/", this.updateKpi).then(resp => {
                    if (resp) {
                        this.initPositions();
                        this.updateKpi.kpi = '';
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
                    this.deleteRequest("/system/cfg/kpiscore/" + data.id).then(resp => {
                        if (resp) {
                            this.initKpi();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            initKpi() {
                this.loading = true;
                this.getRequest("/system/cfg/kpiscore/").then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.kpis = resp;
                    }
                })
            }
        }
    }
</script>

<style>
    .addkpiInput {
        width: 300px;
        margin-right: 8px
    }

    .updatekpiInput {
        width: 200px;
        margin-left: 8px;
    }

    .kpiManaMain {
        margin-top: 10px;
    }
</style>