<template>
    <div>
        <el-card shadow="never" class="card card1">
            <el-col :span="12">
                <div class="greet"> {{ greetWord }}</div>
                <div class="weather"> {{ weatherWord }}</div>
            </el-col>
            <el-col :span="6">
                <div class="">
                    <img src="./../../assets/images/dashboard.70e55b71.png" class="card1_img" alt="" data-v-ca92126c="">

                </div>
            </el-col>



        </el-card>

        <el-row>
            <el-col :span="24">
                <div class="row">
                </div>
            </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
            <!-- 左侧快捷入口 -->
            <el-col :span="10">
                <el-card shadow="never" class="card card2" width="50%">
                    <div slot="header" class="card2Title">
                        <span>快捷入口</span>
                    </div>
                    <!-- <div class="el-card__body"> -->
                    <el-row type="flex" class="row-bg qucickEntrance">
                        <el-col :span="12" v-for="(item, index) in quickEntrance" :key="index">
                            <div class="quickEntranceItem">
                                <div class="icon" @click="changeRouter(index)">
                                    <i :class="quickEntrance[index].icon"
                                        :style="{ backgroundColor: quickEntranceColor[index] }"></i><br>
                                    <span> {{ quickEntrance[index].name }}</span>

                                </div>


                            </div>
                        </el-col>
                    </el-row>
                    <!-- </div> -->
                </el-card>
            </el-col>
            <el-col :span="2"></el-col>
            <!-- 公告栏 -->
            <el-col :span="12">
                <el-card shadow="never" class="card card3">
                    <div slot="header" class="card2Title">
                        <span>公告栏</span>
                    </div>
                    <el-timeline :reverse="reverse">
                        <el-timeline-item v-for="(item, index) in anouncement" :key="index" :timestamp="item.time">
                          <span @click="goAnnouncement(item)" :style="isUrge(item)">{{ item.title }}</span> <span class="reporter" > {{ item.reporter }}</span>
                        </el-timeline-item>
                    </el-timeline>
                </el-card>



            </el-col>

        </el-row>

        <el-row>
            <el-col :span="24">
                <div class="row">
                </div>
            </el-col>
        </el-row>
        <el-card shadow="never" class="card card4">
            <myVideo></myVideo>
        </el-card>
    </div>
</template>

<script>
import { getRequest } from '@/utils/api';
import video from "./video.vue"
export default {
    name: "card",
    components: {
        myVideo: video,
    },
    data() {
        return {
            greetWord: "",
            weatherWord: "",
            quickEntranceColor: ["#FFE1D3", "#D2ECFF", "#E8D8F9",
                "#FFF3D1", "#FFDAEC", "#CEF4F2"],
            quickEntrance: [{
                name: "个人中心",
                route: "adminCenter",
                icon: "el-icon-user",
            },
            {
                name: "写邮件",
                route: "",
                icon: "el-icon-message",
            },
            {
                name: "关于我们",
                route: "",
                icon: "el-icon-star-off",
            },
            {
                name: "关于我们",
                route: "",
                icon: "el-icon-star-off",
            },{
              name: "发布公告",
              route: "/editor/:id",
              icon: "el-icon-s-management",
              },

            ],
            reverse: false,
            anouncement: [
                // {
                //     content: '活动按期开始',
                //     timestamp: '2018-04-15'
                // }, {
                //     content: '通过审核',
                //     timestamp: '2018-04-13'
                // }, {
                //     content: '创建成功',
                //     timestamp: '2018-04-11'
                // }
            ]
        }
    },
    mounted() {
        this.getWeather();
        this.setGreetWords();
        this.getAnoucement();
    },
    methods: {
        getAnoucement() {
            getRequest("/statistics/record/").then(res => {
                this.anouncement = res.obj
                console.log("res", this.anouncement)
            })
        },
        changeRouter(index) {
          console.log(JSON.parse(window.sessionStorage.getItem("user")))
          if (this.quickEntrance[index].name === "发布公告"){
            this.$router.push({
              name:'announcement',
              params:{
                id: -1,
              }
            });
          }else
            this.$router.push(this.quickEntrance[index].route);
            // console.log("val", val);
        },
        getWeather() {
            const url = "https://devapi.qweather.com/v7/weather/now?location=104.07,30.67&key=b866fd31862e494bab6fab8143e9f709"
            getRequest(url).then((res) => {
                if (res.code === 200) {
                    let temp = res.now.temp;
                    let condi = res.now.text;
                    this.weatherWord = "今日" + condi + "，温度" + temp + "℃";
                }

            })
        },
        setGreetWords() {
            const hour = new Date().getHours();
            if (0 < hour && hour <= 12) {
                this.greetWord = "早上好管理员，请开始一天的工作吧"
            }
            else if (12 < hour && hour < 18) {
                this.greetWord = "下午好管理员，下午也要打气精神努力工作哦"
            } else {
                this.greetWord = "晚上好管理员，要好好休息了哦"
            }
        },
        //从公告栏跳转到公告详情页面
        goAnnouncement(item){
          this.$router.push({
            name:'announcement',
            params:{
              id: item.id,
            }
          });
        },
        isUrge(item){
          if(item.isUrge === 1){
            console.log("in---------------")
            return {'color': 'lightcoral'}
          }
        }
    }
}
</script>

<style scoped>
/* .card {
    margin-bottom: 20px;
} */

.card1 {
    position: relative;
    height: 260px;
    text-align: center;
}

.greet {
    margin-top: 80px;
    color: #343844;
    font-size: 22px;
}

.weather {
    margin-top: 10px;
    color: skyblue;
    font-size: 16px;
}

/* .el-card__header {
    padding: 18px 20px;
    border-bottom: 1px solid #EBEEF5;
    box-sizing: border-box;
    white-space: nowrap;
    width: 90%;
    margin: 0 auto;
} */


.card1_img {
    position: absolute;
    top: -169px;
    right: -2px;
    width: 600px;
    height: 600px
}

.row {
    height: 20px;
    background-color: #F0F2F5;
}

.card2 {
    /* margin-bottom: 0px; */
}

/deep/.el-card__body {
    padding-bottom: 0;
}

.card2 {
    margin-left: 20px;
    border: 0px;
}

.qucickEntrance {
    flex-wrap: wrap;
}

.quickEntranceItem {
    text-align: center;
    margin-bottom: 30px;
}


.icon {
    width: 60px;
    height: 60px;
    margin: 0 auto;
}



.icon>i {
    width: 40px;
    height: 40px;
    /* background-color: yellow; */
    line-height: 40px;
    border-radius: 10px;
}

.icon>span {
    font-size: 11px;
}


.icon:hover,
.icon:hover {
    cursor: pointer;
}

.card3 {
    border: 0;
}

.reporter {
    position: absolute;
    right: 20px;
}

.card4 /deep/.el-card__body {
    padding: 0;
}
</style>