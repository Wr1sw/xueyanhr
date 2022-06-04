<template>
    <div style="width: 700px;">
        <el-input
                placeholder="请输入部门名称进行搜索..."
                prefix-icon="el-icon-search"
                v-model="filterText">
        </el-input>

        <el-tree
                :data="deps"
                :props="defaultProps"
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                ref="tree">
            <span class="custom-tree-node" style="display: flex;justify-content: space-between; width: 100%;height: 100%"
                  slot-scope="{ node, data }">
        <span style="height: 110%">{{data.name }}</span>
        <span>
          <el-button
                  type="primary"
                  size="mini"
                  class="depBtn"
                  @click="() => showAddDepView(data)">
            添加部门
          </el-button>
<!--            <el-button-->
<!--                    type="primary"-->
<!--                    size="mini"-->
<!--                    class="depBtn"-->
<!--                    @click="() => showEditView(data)">-->
<!--            更新部门-->
<!--          </el-button>-->
          <el-button
                  type="danger"
                  size="mini"
                  class="depBtn"
                  @click="() => deleteDep(data)">
            删除部门
          </el-button>
        </span>
      </span>
        </el-tree>

        <el-dialog
                title="添加部门"
                :visible.sync="dialogVisible"
                width="30%">
            <div>
                <table>
                    <tr>
                        <td>
                            <el-tag >上级部门</el-tag>
                        </td>
                        <td>{{pname}}</td>
                    </tr>
                    <tr>
                        <td>
                            <el-tag>部门名称</el-tag>
                        </td>
                        <td>
                            <el-input v-model="dep.name" placeholder="请输入部门名称..."></el-input>
                        </td>
                    </tr>
                </table>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doAddDep" >确 定</el-button>
  </span>
        </el-dialog>

        <el-dialog
            title="修改部门信息"
            :visible.sync="dialogVisible1"
            width="30%">
            <div>
                <table>
                    <tr>
                        <td>
                            <el-tag>部门名称</el-tag>
                        </td>
                        <td>
                            <el-input v-model="updateDep.name" ></el-input>
                        </td>
                    </tr>
                </table>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doUpdate" >确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>



<script>
    import axios from "axios";

    export default {
        name: "DepMana",
        data() {
            return {
                dialogVisible1: false,
                dialogVisible: false,
                filterText: '',
                dep: {
                    name: '',
                    parentId: -1
                },
                pname: '',
                deps: [],
                updateDep:{
                    id:'',
                    name:'',
                },
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            }
        },

        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        mounted() {
            this.initDeps();
        },

        methods: {
            initDep() {
                this.dep = {
                    name: '',
                    parentId: -1
                }
                this.pname = '';
            },
            addDep2Deps(deps, dep) {
                for (let i = 0; i < deps.length; i++) {
                    let d = deps[i];
                    if (d.id == dep.parentId) {
                        d.children = d.children.concat(dep);
                        if (d.children.length > 0) {
                            d.parent = true;
                        }
                        return;
                    } else {
                        this.addDep2Deps(d.children, dep);
                    }
                }
            },
            showEditView(data){
              Object.assign(this.updateDep,data)
              this.dialogVisible1 = true;
            },
            doUpdate(){
                console.log(this.updateDep);
                this.putRequest("/system/cfg/department/", this.updateDep).then(resp =>{
                    if(resp){
                        this.initDep();
                    }
                })
            },
            doAddDep() {
                if(this.dep.name) {
                    this.postRequest("/system/cfg/department/", this.dep).then(resp => {
                        console.log(this.dep);
                        if (resp) {
                            this.addDep2Deps(this.deps, resp.obj);
                            this.dialogVisible = false;
                            //初始化变量
                            this.initDep();
                        }
                    })
                }else{
                    this.$message.error("部门填写为空");
                }
            },

            removeDepFromDeps(p,deps, id) {
                for(let i=0;i<deps.length;i++){
                    let d = deps[i];
                    if (d.id == id) {
                        deps.splice(i, 1);
                        if (deps.length == 0) {
                            p.parent = false;
                        }
                        return;
                    }else{
                        this.removeDepFromDeps(d,d.children, id);
                    }
                }
            },
            deleteDep(data) {
                if (data.parent) {
                    this.$message.error("父部门删除失败");
                } else {
                    this.$confirm('此操作将永久删除【' + data.name + '】部门, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.deleteRequest("/system/cfg/department/"+data.id).then(resp=>{
                            if (resp) {
                                this.removeDepFromDeps(null,this.deps,data.id);
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            },
            showAddDepView(data) {
                this.pname = data.name;
                this.dep.parentId = data.id;
                this.dialogVisible = true;
            },
            initDeps() {
                this.getRequest("/system/cfg/department/").then(resp => {
                    if (resp) {
                        this.deps = resp;
                    }
                })
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            }
        }
    }
</script>

<style>
    /* 设置树形最外层的背景颜色和字体颜色 */
    .el-tree {
        color: #000000;

    }

    /* 设置三角形图标的颜色 */
    .el-tree-node__expand-icon {
        color: #000000;
    }

    /* 设置节点鼠标悬浮三角图标鼠标悬浮的颜色 */
    .el-tree-node__content:hover .el-tree-node__expand-icon {
        /*color: #000;*/
    }
    /* .el-tree-node__content:hover .el-tree-node__expand-icon.is-leaf {
      color: transparent;
    } */

    /* 树节点鼠标悬浮式改变背景色，字体颜色 */
    .el-tree-node__content:hover {
        /*background-color: rgba(0, 0, 0, 0);*/
        color: #000000;
    }

    /* 改变节点高度 */
    .el-tree-node__content {
        height: 32px;
    }

    /* 节点前边的三角图标并不会被节点样式影响，需要单独修改 当前激活的颜色*/
    .el-tree-node:focus > .el-tree-node__content
    .el-tree-node__expand-icon {
        /*color: #fff;*/
    }

    /* 改变被点击节点背景颜色，字体颜色 */
    .el-tree-node:focus > .el-tree-node__content {
        /*background-color: #ffffff;*/
        /*color: #fff;*/
    }

    .depBtn {
        padding: 2px;
        margin-top: 1px;
        width: 60px;
        height: 30px;
    }
</style>