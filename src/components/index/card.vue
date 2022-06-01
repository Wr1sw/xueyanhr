<template>
    <div>
        <el-card shadow="never" class="card card1">
            <el-col :span="12">
                <div class="greet"> {{ greetWord }}</div>
                <div class="weather"> {{ weatherWord }}</div>
            </el-col>t
            <el-col :span="6">
                <div class="">
                    <img src="./../../assets/images/dashboard.70e55b71.png" class="card1_img" alt="" data-v-ca92126c="">

                </div>
            </el-col>



        </el-card>

        <el-card shadow="never" class="card card2">

            <div slot="header" class="card2Title">
                <span>快捷入口</span>
            </div>
            <div>
                <el-row type="flex" class="row-bg">
                    <el-col :span="6" v-for="(item, index) in quickEntrance" :key="index">
                        <div class="quickEntranceItem">
                            <div class="icon" @click="changeRouter(index)">
                                <i :class="quickEntrance[index].icon"
                                    :style="{ backgroundColor: quickEntranceColor[index] }"></i><br>
                                <span> {{ quickEntrance[index].name }}</span>

                            </div>


                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-card>

        
        <el-card shadow="never" class="card card3">
            <myVideo></myVideo>
        </el-card>
    </div>
</template>

<script>
import { getRequest } from '@/utils/api';
import video from "./video.vue"
export default {
    name: "card",
    components:{
        myVideo:video,
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
                name: "关于我们",
                route: "11",
                icon: "el-icon-star-off",
            },
                // {
                //     name: "个人中心",
                //     route:"adminCenter",
                //     icon:"....",
                // }
            ]
        }
    },
    mounted() {
        this.getWeather();
        this.setGreetWords();
    },
    methods: {
        changeRouter(index) {
            console.log(JSON.parse(window.sessionStorage.getItem("user")))
            this.$router.push(this.quickEntrance[index].route);
            // console.log("val", val);
        },
        getWeather() {
            const url = "https://devapi.qweather.com/v7/weather/now?location=104.07,30.67&key=b866fd31862e494bab6fab8143e9f709"
            getRequest(url).then((res) => {
                if (res.code == 200) {
                    let temp = res.now.temp;
                    let condi = res.now.text;
                    this.weatherWord = "今日" + condi + "，温度" + temp+"℃";
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
        }
        // if()
    }
}
</script>

<style scoped>
.card {
    margin-bottom: 20px;
}

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


.quickEntranceItem {
    text-align: center;
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
</style>