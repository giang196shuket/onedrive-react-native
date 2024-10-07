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