<template>
  <div>
    <div v-if="!state" class="side">
      <div class="zixun">
        <img
          class="kefu_avatar"
          src="https://oss.business.quanyu123.com//ed0fe82131674ac3379ac8753ec1d769.png"
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
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAAXNSR0IArs4c6QAAAE5QTFRFAAAAn5+fl5eXmpqal5eXmZmZmZmZl5eXmJiYmZmZmZmZmZmZmZmZmJiYmJiYmZmZmZmZmJiYmJiYmZmZmZmZmJiYmJiYmZmZmZmZmZmZEoIrgAAAABl0Uk5TABAgMEBQX2BvcH+Aj5CfoK+wv8DP0N/g8HmFogMAAADGSURBVBgZtcHRcoIwFEXRfZNbUdKAghjP//9oDeAUHH3qdC3+kx2PfGJXqeMhDcPQHdgZ9ZCB4NGb/t7yq9HMWYXLYDwVzW4Quq4NwGliFbRqMPdUOoM+s3CtRmZpMiiBhVYN1h4NcoJTZtGrujiElEvECoSRRVCVmMUCCYissqrILEd2rOjharzlqs68l1SdDfgaDrzoVV0jQdLN2Rs1a8+qvtmxUVsde722EntJG5kXXvQ0Ga+s12Iy3vCLpHviA3Pnz34AZrQTpOlsr5sAAAAASUVORK5CYII="
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
            font-size: 14px;
            font-weight: 600;
            line-height: 16px;
            color: #333333;
          "
        >
          191-0655-9871
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
          src="https://oss.business.quanyu123.com//dee133c54041034454ca94d27b301a2f.png"
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
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAAXNSR0IArs4c6QAAAEtQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////g5kLBwAAABh0Uk5TABAgMD9AUGBwf4CPkJ+gsL/Az9Df4O/wsXM2rQAAAO9JREFUSMft1tsOgyAMBuAWh1O24RQPvP+T7sKYKZa0ROPFxn9p/ERSWwTIybkg+Oq9KN0DQ6tGL04f6rdPiA1wivXj1uok7E/HhiqDEWK6iEJcU7a+Ys//iA1d3XYXrs6LnO7IdfOuzkt1HQLALQyK9jwpUFS39lqADWBkSpQ8VmD5ntbRmnQ++lweR2utfx1Pxfd0cKnY7oeaHI+rlbtT91wcwXAIP49gbCO4jeFNT5fL4sNq3hRQRWxDnisuGDt0T4Z3AX0VSrt6lWFetkLqRHPMuJs/Tvo4dOyoRBfDvJ01cbmRWAB0Lv955lyUD7JSiwoagwR/AAAAAElFTkSuQmCC"
          style="width: 30px; height: 30px"
        />
        <span style="margin-left: 4px; font-size: 14px" @click="jump()">
          产品反馈
        </span>
      </a>
    </div>
    <div v-if="state" class="sm_side">
      <div class="hide_kefu" @click="changeKefu">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAADHlJREFUeNrtm3lsFNcZwJHaf5oeOZoDjE3s9bmHb3xQkoqmNFWbpE2AtFFD2iD4K0VqMGCDz7WNvevbXp+0TaFqSKumIk3aYkLaQNKQKCUpCDAN6imqVq1QSfDuzr28fm+O3Tezb2bHu15jEo/0aSZSPLvz0+993/e+WZYtWzqWjqVj6fiIHvcG0B01E3xJ1YS4vnpc+nb1WGR31ai4q2pU2lwxKt63egR5qsfQZz8yQO6ZQLfWTkqP10xIv6iZiMwCFISjaoyIUQmt1iIgocqAiCoC4pXKEelQ+bC0saQPffJDB2bNlLS1ZlJ6rWYygqonJARwkAInIkPB1xgIvl49KsrXGIwMaESEawlVDAMouC7H52FxunyI33TDg6mdkjbUTEUuYjAYSo0Ojrk5GE6lBmdEAVMxHIvyISXKhoQ/lA2In7vhwKz9PnLDUjpRO6VCMTUnIhszB3MAjKDAGYTzoIhKB+A8IPyspIfJvDGs2R9prAUgODRzqi3MUawRzwKUE6sDohwABMeMZk650RyAUzaongFQqRLB0gH+m4sWTOV+dPOaqWu/rdHgWJkzFpmBatVXNS49hP/ONHcNotsqRqRHANAILKe/Gs3BkEr7FUAl/bx8Xdwr7F90cHApXjMVOU0zpzpmDgNw9leOCTXJfk7pgPgFAHQIW0OYA3DU6OMhAFIf/8tF1cuAOe/pzCGX1ZjEgDlN7nH0qfn6zHL4zJIBYYg0Jwqnl8cWIU+PcOz6w/kRugOgXDAzp2pCOl4+ijLS9fnF/XwRmHNeD4cHOHDukc+/vs5l/NpbceaMR80JLEiPNYg+ARa9GDNHPfsVUB4/F7g+cCYjPVFzJghzxvFZ7LVzj4qAtAF3yJXD4mlIxP+ESsVWDIkMlPJLEO9CvjlYNiQ9YMumXv6wp0eFoobbr4THxz+ywKUc1ZiZA5VpPFFCh5I+CiU8DHB0zR8+y1WKKOVytRoQr5b2875E2www5xXNHBkMhMvHIZefu1zsQ7cuGCCA847OHLWEw/mwZSsQEHcClNloh2zob+QYJPocrVL1R+My5JxtZvfHAAHKWc0ct08F1C1HYIHgSE8YzZET8ph4Fnqam6hghtAKMOak3BnLcEhzBAtzhFifgxNxv1zC8fVLlX56/1TSx+YAnKsYjAxIhsMjZxeHnJ1c/kLknj/rzVGiJoBc9Dwj1AKY97U9Fd0cgTAn1t9o5ig9jrGU85fcPi6P9pkuP7/ZFYUDYHAAoKIu9kCa4UjfqI4zB7YM45F+qm3D6C4A8m+6OWIS5pB9jgzpHK5itM92+viTUXO6MRwFUmFbOG1txzKAM23IORhQiLZdePTn6GOQc96yNkeM7akszCmm9DnR8PM/oQLaJ9Rq5mhRtA8AdXK70wKnXJ7+UeY4Y2KXydLaHjNH1OWc6J7KzJx+a3OiVQqfIdd4fNz9VEhd3GsYigKHlQEVdXJ/TE9ynpC2kDknuiOfQA5aNYHl9L8KwyyHzDmW5vTFzCmmmaOWcKJanaEC6mS3auYo9rDYIOT2hpbP//Ial54lzVEBnaLbIzZqOad8WEhoTqnRHGJZeQxw3H5OhcPJcOQy7pMhbTR+DwdUuqJONgoH7EEFHQCpg908L1COzaCy6fPoO9MzqK3uxWsfbDpkmOWYLK/KYeES1RzVmFTMcROhwIn2OdO07wKA3tTMKfOx6KuTPNrzgvgmfqajM+jr+BnnDOb439EtR86hFwAOMsZzpxB69Fl1EhgQ1xv/tmxYqKq0mACWDejNKTGa02uWc1RzfDFzcJ/jJPqcMi+6xfh9AIwfw9n4Qx4devsaoj0TxAH8zLYBAZwTJjeS4/BphO6ZlFDpIFoZb4/YWUGdANo0p9fCHK3505tDVCrmsXhA7JY1/Ryyeh41Ds5lWSW8YevRiEitdsPCjy3N6bc2R+1vzM3pVnIOaY6WiJ1dfJPx+0DOubf3WMQOIGRruR05j562c7PJN5BATdDD4lESjjY3Nk4Adeb0zsGc7nhztCoFzeAUxaCcwHF7gI5cQA8nBDR9Dnnt3Oz5d1GYatCQcCp5c4QkzGGVDlmpVi9Rn8nG88gBzz5vgHDQ/h5gvGplTokNc9xzNUdpAHGlev4GAARD9QXLOVFzlCawgxtZ9IDgJd6Azpx+a3NoE0CjOU4Lcwo7tQ4ZB9NwAxjEf4v6voq+G9eZo4OjM4fT5ZxoZ0xsH3CHXNDOfnHRA8KDLAAjzZc5Tsuco5gjw+ngri6DCcJiAnTG9AVfv3BcyzlJmdMdyzlFBjjankpnDkR+O/ucxTN9MH+AZtCTtnoG6LZNZ8MD3NfSZU4s37BROLC0YBDGlyS7MyAArUsM6E8o2xYgaCgTvGE4RjXHrzeHNjt2ERNAXc7B5nTEmYPyO9hnUl4V2DJ4dlvbjUQ3BDj/SHSPkh6ukDoBpJljmB3HmaMuJ6WU682BuJLrDd6ZcPMN3znl5RW35aCv3YN2d76ePn6zbshlxxy1MzY1pz1mDlxH8r3s5+1OKPB3p5oDaSXpmZB8Y1ibtvUzQurhfkC+zIuHo7dGb07MGoo5qKCNbUx6zgXPNKcRR7qOdV70cYDTC+ZcMzPHOVdzOlghr53ZsezDdMDr368AnMsuG+ZoJVxnTruakNvZv8Crm9U31MPLv7DoEZ6CMenFYh+33uz/y2tDn3F1sd1ROCbmFNLNmYW9lmXlzGthtzlawjM5rezWRQMHoGz39AqXiWoVcvuEKsu8tI/JcnXxbc593AXFGlbf4+jNOVkAy8ntvXqbJZxWZkduC4McOJrDKKeF+VdOU+iJ6wYGfsG1GuCcMXlfFfJ0cw/auQ9MAT3OTv5hgLGtsJNvKOxg6vGYNK89/FAugLRzj9w2ZgTMQbkqHEczg3KaABI+N4ZedzQvwDt5ffnmHoAmkLF8X4VfxXTznen8Hvg1sqOFfdlBmCPDwQYBoGwtGsPvZzcxtQuzpHr4xxO96TRUqxm3j71vvr9HXmv4u3mtbBCb4zCa08TIYPD57kYZELp7b5gFm76UVjgwutikWWOcAHqMv8kxVCtXF/eGc19qv2Mu8M7eruaaS7mtqjVxcMIqHAWMCkeJPWG0ai+zNk3JmFtfbGZOgvdV5OwYeptg0T7+AJzvT/SZGV50U66XvS+vjW3NbQm/AnDkPKPAUczJMZrTGDsrcEIynFV7QgqgPaGrWY1Bz7zCccMPugHKf8xnx+bm6Hfj1Gr1N6hUv4cyfiIaXhzM6bw2BuHAQMiwMiebak4IwCiQVjWEUFZD6Pz8Lq0+4adm5riIUYXbYgJYRJkAQl8T3TYAFPmc52XkawUOKwPRmdNsbQ42hmpOgwIpq14GBBGcnwJS6ufdczHHacOcAq3PIeDkq+e8KBzCmha9OTlGcxr1oTdHsUY1RwGkBOdouHLzPPQ73CTtfZUrhdmxHg4jw0nNHAWIHXMyVUCZu4NoZX3o6ZTgVEKSBDghS3MosxxyjhM/OzaY41UhmZnTojcnx4Y5q7ScQ5pD2JO5W4tgarmoGDaYtN8d68zpSpBzOvQ5J9+wrDAQozm5acg5pDkYzspdyjmrPoXfLELe6aGao5Zwl8UEsMh8AkiYE7PG1Jxma3MUa0KEOfE5J9NgDoazcpd63pnCfq24R3idOgG0MKeQag5LmMNYmuOwYU62Sc6JLasE5gCcjJ0KpIy64ETy/Y+fv2g6O+6mz3Hs5hwMJXVzwgnNyTQ1JyhDyqgL/Sr5CuYX/kszxzknc5iUzInfNoTmZM5KmjkaHIgVO2ZPJT8F9PGzLhtvHQpt5xyGmnMcacg5ZuZkkHDqMKDge8kvMfh5bdzseA7vq6LmeBOY00KY00Saw8Sbs0dvTpbRHDDGaM5K0pw6Dc6sCmg2+X/j6u7ivpzIHLP3VfmEOXkW5mjWWJlD5huqOfVW5uiXFAa0Qo3lO2bfvr3+8qdT6oWKurkCgPQ7M3MKDK9kdDmHMMbSnGajOeG43bilOSoUW+bsUMxZXjfbN7/Tu25mLfxrmTaA8zJYc9XaHCahObkm5pC78WxiT0Wak2U0Z7dJziGsgWrFwPlVgNN05/dCd6V9sljUwRcXdfIbCjqY7YXtbAcAeQYg/QagvAOQLun2VAnMyTGrVlpnvJfojOPMCcpwtM4YzhehWk1n7Jw9CJC6M3bMboH/LlmUr4Pwa54CL+fIb2FqAMiDuS2hJ3ObmZ1w7SUjW4tGfQAQXWQ1hJtha/AUjCoeW7UrtD5zV3BdLBYphKVj6Vg6lo4Ujv8D4aeyeoBZGhkAAAAASUVORK5CYII="
          style="width: 36px; height: 36px"
        />
      </div>
      <a class="hide_luntan" href="#">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAAXNSR0IArs4c6QAAAEtQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////g5kLBwAAABh0Uk5TABAgMD9AUGBwf4CPkJ+gsL/Az9Df4O/wsXM2rQAAAO9JREFUSMft1tsOgyAMBuAWh1O24RQPvP+T7sKYKZa0ROPFxn9p/ERSWwTIybkg+Oq9KN0DQ6tGL04f6rdPiA1wivXj1uok7E/HhiqDEWK6iEJcU7a+Ys//iA1d3XYXrs6LnO7IdfOuzkt1HQLALQyK9jwpUFS39lqADWBkSpQ8VmD5ntbRmnQ++lweR2utfx1Pxfd0cKnY7oeaHI+rlbtT91wcwXAIP49gbCO4jeFNT5fL4sNq3hRQRWxDnisuGDt0T4Z3AX0VSrt6lWFetkLqRHPMuJs/Tvo4dOyoRBfDvJ01cbmRWAB0Lv955lyUD7JSiwoagwR/AAAAAElFTkSuQmCC"
          style="width: 36px; height: 36px"
        />
      </a>
    </div>
  </div>
</template>
<script>
  // 客服组件现阶段纯静态页面，后期会根据业务需求进行优化
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
      jump() {
        window.open('https://support.qq.com/product/482628')
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
