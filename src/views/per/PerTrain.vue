<template>


  <div>
    <trainData ref="trainData" v-show="showTrainData" @showTrainInfoPage="showTrainInfoPage"></trainData>
    <trainInfo ref="trainInfo" v-show="!showTrainData" @showTrainDataPage="showTrainDataPage"></trainInfo>
  </div>
</template>

<script>
import {postRequest,getRequest} from "@/utils/api";
import TrainData from "@/views/per/perTain/TrainData";
import TrainInfo from "@/views/per/perTain/TrainInfo";
export default {
  name: "PerTrain",
  components:{
    trainData:TrainData,
    trainInfo:TrainInfo
  },
  data(){
    return{
      showTrainData: true,
    }
  },
  methods:{
    showTrainInfoPage(id){
      this.showTrainData = false;
      this.$nextTick(() => {
        this.$refs.trainInfo.getTrainInfo(id);
      });
    },
    showTrainDataPage(){
      console.log("in");
      this.showTrainData = true;
      this.$nextTick(() => {
        this.$refs.trainData.getTrainData();
      });
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
