package com.sukddak.spyfall.client.http


import okhttp3.OkHttpClient
import java.util.concurrent.TimeUnit

object OkHttpClientObject {
    // OkHttpClient instance를 애플리케이션 전체에서 공유하는 싱글턴으로 사용하면
    // 연결 풀링 및 스레드 풀 관리 등의 이점을 얻을 수 있다.
    val instance: OkHttpClient = OkHttpClient.Builder()
        // 웹 소켓 연결이 끊기지 않도록 주기적인 ping message
        .pingInterval(30, TimeUnit.SECONDS)
        .readTimeout(100, TimeUnit.SECONDS)
        .writeTimeout(100, TimeUnit.SECONDS)
        .retryOnConnectionFailure(true)
        .build()
}