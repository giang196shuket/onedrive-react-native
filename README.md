npm i axios react-native-app-auth
android/app/build.gradle.
android {
    defaultConfig {
        applicationId "com.yourapp"
        // Thêm dòng này để thay thế giá trị cho <appAuthRedirectScheme>
        manifestPlaceholders = [
            appAuthRedirectScheme: 'onedriver-react-native' // Giá trị tương ứng với phần scheme của redirect URL
        ]
    }
}

Open android/app/build.gradle and Add below mentioned line after the react.gradle.
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"


react-native start
=> a
