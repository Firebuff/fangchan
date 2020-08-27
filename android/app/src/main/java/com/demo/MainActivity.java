package com.demo;

import com.facebook.react.ReactActivity;

import android.os.Bundle;

import org.devio.rn.splashscreen.SplashScreen;

//友盟引入开始
import android.os.Bundle;
import com.umeng.socialize.UMShareAPI;
import com.demo.umeng.ShareModule;
import android.content.Intent;
//友盟引入结束


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Demo";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this, true);  // 启动页
    super.onCreate(savedInstanceState);
    ShareModule.initSocialSDK(this);//友盟初始化
  }
  //友盟分享回调
  @Override
  public void onActivityResult(int requestCode,int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
  }
}
