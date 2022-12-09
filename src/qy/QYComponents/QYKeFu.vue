<template>
  <div>
    <!-- 全局悬浮客服 -->
    <div v-if="!state" class="side">
      <div class="zixun">
        <img
          class="kefu_avatar"
          src="https://www.crmeb.com/static/images/kefu_avatar.png"
        />
        <p
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 8px;
          "
        >
          <img
            src="https://www.crmeb.com/static/images/icon/call_icon.png"
            style="width: 12px; height: 12px"
          />
          <span
            style="
              padding-left: 2px;
              font-family: PingFang SC;
              font-size: 12px;
              font-weight: 400;
              color: #999999;
            "
          >
            咨询热线
          </span>
        </p>
        <p
          style="
            margin-top: 8px;
            font-size: 16px;
            font-weight: 600;
            line-height: 16px;
            color: #333333;
          "
        >
          400-8888-794
        </p>
        <i
          class="el-icon-close"
          style="
            position: absolute;
            top: 0;
            right: 5px;
            font-size: 12px;
            color: #b7c8e8;
          "
          @click="changeKefu"
        ></i>
      </div>
      <div class="work_code">
        <img
          src="https://store.crmeb.net/uploads/attach/2022/08/20220831/ba58091249f30a2a647f7d06aafd2942.jpg"
          style="width: 106px; height: 106px; margin-top: 6px"
        />
        <p
          style="
            margin-top: 4px;
            font-family: PingFang SC;
            font-size: 13px;
            font-weight: 400;
            color: #666666;
          "
        >
          微信扫码咨询
        </p>
      </div>
      <a class="luntan" href="#">
        <img
          src="https://www.crmeb.com/static/images/icon/ruzhu.png"
          style="width: 30px; height: 30px"
        />
        <span style="margin-left: 4px; font-size: 14px">官方论坛</span>
      </a>
    </div>
    <div v-if="state" class="sm_side">
      <div class="hide_kefu" @click="changeKefu">
        <img
          src=" https://www.crmeb.com/static/images/icon/side_kefu.png"
          style="width: 36px; height: 36px"
        />
      </div>
      <a class="hide_luntan" href="#">
        <img
          src="https://www.crmeb.com/static/images/icon/ruzhu.png"
          style="width: 36px; height: 36px"
        />
      </a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'KeFu',
    data() {
      return {
        state: true,
      }
    },
    methods: {
      changeKefu() {
        this.state = !this.state
      },
    },
  }
</script>
<style lang="scss" scoped>
  .side {
    position: fixed;
    top: 50%;
    right: 20px;
    z-index: 99;
    display: block;
    width: 120px;
    height: 480px;
    overflow: hidden;
    transform: translateY(-50%);
    .zixun {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 120px;
      height: 173px;
      background: #fff;
      border-radius: 63px 63px 4px 4px;
      box-shadow: 0px 3px 10px rgb(5 36 82 / 8%);
      .kefu_avatar {
        display: block;
        width: 90px;
        height: 90px;
        margin-top: 15px;
      }
    }
    .work_code {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 120px;
      height: 142px;
      margin-top: 10px;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0px 3px 10px rgb(5 36 82 / 8%);
    }
    .luntan {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 44px;
      margin-top: 10px;
      color: #fff;
      text-decoration: none;
      background: linear-gradient(135deg, #3e9fff 0%, #176ff2 100%);
      border-radius: 4px;
      box-shadow: 0px 3px 10px rgb(5 36 82 / 8%);
    }
  }
  .sm_side {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 1000;
    width: 60px;
    height: 130px;
    .hide_kefu {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0px 3px 10px rgb(5 36 82 / 8%);
    }
    .hide_luntan {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      margin-top: 10px;
      text-decoration: none;
      background: linear-gradient(135deg, #3e9fff 0%, #176ff2 100%);
      border-radius: 4px;
    }
  }
</style>
