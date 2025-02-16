package com.sukddak.spyfall.client.http

import android.util.Log
import okhttp3.Request
import okhttp3.Response
import okhttp3.WebSocket
import okhttp3.WebSocketListener
import okio.ByteString


class HttpWebSocket {

    companion object {
        private const val TAG = "WebSocket"
    }

    private var webSocket: WebSocket? = null
    var isRunning = false
    var onConnectionOpened: (() -> Unit)? = null
    var onStringMessageReceived: ((String) -> Unit)? = null
    var onByteMessageReceived: ((ByteString) -> Unit)? = null
    var onConnectionClosed: ((code: Int, reason: String) -> Unit)? = null
    var onConnectionFailed: ((Throwable) -> Unit)? = null

    private val webSocketListener = object : WebSocketListener() {
        override fun onOpen(webSocket: WebSocket, response: Response) {
            Log.d(TAG, "[WebSocketListener::onOpen] response=$response")
            isRunning = true
            onConnectionOpened?.invoke()
        }

        override fun onMessage(webSocket: WebSocket, text: String) {
            Log.d(TAG, "[WebSocketListener::onMessage] text=$text")
            onStringMessageReceived?.invoke(text)
        }

        override fun onMessage(webSocket: WebSocket, bytes: ByteString) {
            Log.d(TAG, "[WebSocketListener::onMessage] bytes=$bytes")
            onByteMessageReceived?.invoke(bytes)
        }

        override fun onClosing(webSocket: WebSocket, code: Int, reason: String) {
            Log.d(TAG, "[WebSocketListener::onClosing] code=$code,reason=$reason")
            close(1000, null)
            isRunning = false
        }

        override fun onClosed(webSocket: WebSocket, code: Int, reason: String) {
            Log.d(TAG, "[WebSocketListener::onClosed] code=$code,reason=$reason")
            onConnectionClosed?.invoke(code, reason)
        }

        override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
            Log.d(TAG, "[WebSocketListener::onFailure] throw=${t.message},response=$response")
            isRunning = false
            onConnectionFailed?.invoke(t)
        }
    }

    fun connect(url: String) {
        try {
            val request: Request = Request.Builder()
                .url(url)
                .build()
            webSocket = OkHttpClientObject.instance.newWebSocket(request, webSocketListener)
            Log.d(TAG, "[connect] WebSocket 시작:webSocket=$webSocket")
        } catch (e: Exception) {
            Log.e(TAG, "[connect] WebSocket 통신 오류:error=$e")
            isRunning = false
        }
    }

    fun send(message: String) {
        webSocket?.send(message)
    }

    fun send(byteString: ByteString) {
        webSocket?.send(byteString)
    }

    fun close(code: Int, reason: String?) {
        Log.d(TAG, "[close] code=$code,reason=$reason")
        webSocket?.close(code, reason)
        webSocket?.cancel()
        webSocket = null
    }

    fun reconnect(url: String) {
        Log.d(TAG, "[reconnect] url=$url")
        close(1000, "reconnect")
        connect(url)
    }

}