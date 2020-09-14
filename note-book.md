## code-push
1.  ##### 下载工具全局安装 npm install -g code-push-cli 或者App Center CLI
2.  ##### 注册账号，具体可以百度，很简单的
3.  ##### 安装包 npm install react-native-code-push –save
4.  ##### 配置（可以去github上查看文档，配置针对不同的rn版本有不同的配置项，这里是0.60+版本的配置）
    - android/settings.gradle 中添加如下代码

            include ':app', ':react-native-code-push'
            project(':react-native-code-push').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-code-push/android/app')

    -  android/app/build.gradle 中的 apply from: “../../node_modules/react-native /react.gradle” 的下面添加如下代码

            ...
            apply from: "../../node_modules/react-native/react.gradle"
            apply from: "../../node_modules/react-native-code-push/android/codepush.gradle" //（加上这一行）
            ...

    - MainApplication.java 中添加如下代码

            ...
            // 引入插件类
            import com.microsoft.codepush.react.CodePush;

            public class MainApplication extends Application implements ReactApplication {

                private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
                    ...
                    // 添加这一段
                    @Override
                    protected String getJSBundleFile() {
                        return CodePush.getJSBundleFile();
                    }
                    ...
                };
            }

    - android/app/build.gradle 中的buildTypes中添加如下代码

            buildTypes {
                debug {
                    ...
                    resValue "string", "CodePushDeploymentKey", "FiUtn39ZeX8EY1Z31tp-YLXTqAR_r4YjL3zKA" //调式时的key，一般为空
                    ...
                }
                release {
                   
                    ...
                    //这里的key为Staging的key
                    resValue "string", "CodePushDeploymentKey", "FiUtn39ZeX8EY1Z31tp-YLXTqAR_r4YjL3zKA"
                    ...
                }
                releaseStaging {
                    ...
                    //这里的key为Productionde的key
                    resValue "string", "CodePushDeploymentKey", "Dllnl64OWn2iE3_wfuRkjeot551VY94-h-kFS"
                    matchingFallbacks = ['release']
                    ...
                }
            }
            
    - android/app/build.gradle中的android.defaultConfig.versionName属性，需要把应用版本改成 1.0.0（默认是1.0，但是codepush需要三位数）

5. ##### 使用code-push

    - 在项目的根目录（入口文件）中引入插件，并且设置为高阶组件


            import App from './src/app';
            import CodePush from 'react-native-code-push'; // 引入code-push

            let codePushOptions = {
                //设置检查更新的频率
                //ON_APP_RESUME APP恢复到前台的时候
                //ON_APP_START APP开启的时候
                //MANUAL 手动检查
                checkFrequency: CodePush.CheckFrequency.MANUAL,
            };

            // 这一行必须要写
            CodePushApp = CodePush(codePushOptions)(App);

            AppRegistry.registerComponent(appName, () => CodePushApp);
    
    - 需要更新的地方添加如下代码，点击按钮检查更新（也可以在首页渲染的componentDidMount中检查更新）

            import CodePush from 'react-native-code-push'; // 引入code-push

            updateHandle() {
                CodePush.checkForUpdate('FiUtn39ZeX8EY1Z31tp-YLXTqAR_r4YjL3zKA').then((update) => {
                    console.log(update)
                    if (!update) {
                        Alert.alert('提示', '已是最新版本--', [
                            {
                                text: 'Ok',
                                onPress: () => {
                                    console.log('点了OK');
                                },
                            },
                        ]);
                    } else {
                        CodePush.sync({
                                deploymentKey: 'FiUtn39ZeX8EY1Z31tp-YLXTqAR_r4YjL3zKA',
                                updateDialog: {
                                    optionalIgnoreButtonLabel: '稍后',
                                    optionalInstallButtonLabel: '立即更新',
                                    optionalUpdateMessage: '有新版本了，是否更新？',
                                    title: '更新提示',
                                },
                                installMode: CodePush.InstallMode.IMMEDIATE,
                            },
                            (status) => {
                                switch (status) {
                                    case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                                        console.log('DOWNLOADING_PACKAGE');
                                        break;
                                    case CodePush.SyncStatus.INSTALLING_UPDATE:
                                        console.log(' INSTALLING_UPDATE');
                                        break;
                                }
                            },
                            (progress) => {
                                //这里可以显示更新下载进度
                                console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
                            },
                        );
                    }
                });
            }
            

6. ##### 打包发布更新

    - ###### 发布更新有2种方式： 
        1. 打包和发布

                react-native bundle --platform <ios/android> --entry-file <index.ios.js RN的入口文件> --bundle-output <./bundles/SwitchCheck010004.js 打包jsbundle放置的路径> --assets-dest <./bundles 资源文件的路径>
        
        2. 打包并发布
        
                   code-push release-react <appName> <platform>
                    [--bundleName <bundleName>]js bundle默认的文件名
                    [--deploymentName <deploymentName>]--d部署环境
                    [--description <description>]--des更新描述
                    [--development <development>]--dev false
                    [--disabled <disabled>]-x更新包是否让用户使用，如果为true，则不会让用户下载这个更新包
                    [--entryFile <entryFile>]-e入口文件
                    [--mandatory]-m是否强制更新
                    [--sourcemapOutput <sourcemapOutput>]
                    [--targetBinaryVersion <targetBinaryVersion>]-t目标版本
                    [--rollout <rolloutPercentage>] 用来指定可以接收到这个更新的用户的百分比，取值范围为0-100，不指定时默认为100

    - ###### 打安卓包，在手机上安装就可以看到更新效果了，不打包是看不到效果的


6. ##### code push 其他更多命令

        // 安装
        npm install -g code-push-cli
        // 注册账号
        code-push register
        // 登陆
        code-push login
        // 注销
        code-push logout
        // 添加项目
        code-push app add [app名称]
        // 删除项目
        code-push app remove [app名称]
        // 列出账号下的所有项目
        code-push app list
        // 显示登陆的token
        code-push access-key ls
        // 删除某个access-key
        code-push access-key rm <accessKey>
        // 添加协作人员
        code-push collaborator add <appName> next@126.com
        // 部署一个环境
        code-push deployment add <appName> <deploymentName>
        // 删除部署
        code-push deployment rm <appName>
        // 列出应用的部署
        code-push deployment ls <appName>
        // 查询部署环境的key
        code-push deployment ls <appName> -k
        // 查看部署的历史版本信息
        code-push deployment history <appName> <deploymentNmae>
        // 重命名一个部署
        code-push deployment rename <appName> <currentDeploymentName> <newDeploymentName>
        清除已经上传的版本 code-push deployment clear <app-name> 部署环境//Production, Staging等

        






