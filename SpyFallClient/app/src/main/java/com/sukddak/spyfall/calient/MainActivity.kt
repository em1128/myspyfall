package com.sukddak.spyfall.calient

import android.content.ContentValues.TAG
import android.os.Bundle
import android.util.Log
import android.view.Gravity
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Row
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.tooling.preview.Preview
import androidx.lifecycle.lifecycleScope
import com.sukddak.spyfall.calient.http.HttpWebSocket
import com.sukddak.spyfall.calient.ui.theme.SpyFallClientTheme
import kotlinx.coroutines.launch
import java.util.Timer
import java.util.TimerTask

class MainActivity : ComponentActivity() {

    private val wsClient = HttpWebSocket()
    private var responseText = mutableStateOf("")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        initWsClient()
        initViews()
    }

    private fun initViews() {
        setContent {
            SpyFallClientTheme {
                Surface(color = androidx.compose.ui.graphics.Color.White) {
                    responseText = remember { mutableStateOf("") }
                    Greeting(responseText.value)
                }
            }
        }

        wsClient.connect("ws://mkmc.duckdns.org:8082")
    }


    private fun initWsClient() {
        wsClient.apply {
            onConnectionOpened = {
                lifecycleScope.launch {
                    Toast.makeText(this@MainActivity, "웹소켓 연결됨", Toast.LENGTH_SHORT).show()
                }

                sendWebSocket()
            }

            onStringMessageReceived = { message ->
                lifecycleScope.launch {
                    responseText.value = message
                    Toast.makeText(this@MainActivity, "메시지 수신됨 : ${message}", Toast.LENGTH_SHORT).show()
                }
            }

            onByteMessageReceived = { message ->
                lifecycleScope.launch {

                }
            }

            onConnectionClosed = { code, reason ->
                lifecycleScope.launch {
                    Toast.makeText(this@MainActivity, "웹소켓 종료됨", Toast.LENGTH_SHORT).show()
                }
            }

            onConnectionFailed = { error ->
                lifecycleScope.launch {
                    Toast.makeText(this@MainActivity, "웹소켓 실패함. ${error.message}", Toast.LENGTH_SHORT).show()
                }
            }

        }
    }

    private fun sendWebSocket() {
        val jsonToSend = "{\"type\":\"createRoom\"}"
        Log.d(TAG, "[sendWebSocket] jsonToSend=$jsonToSend")
        wsClient.send(jsonToSend)
    }

}

@Composable
fun Greeting(responseText: String) {
    ResponseTextView(responseText)
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    SpyFallClientTheme {
        Greeting(responseText = "")
    }
}

@Composable
fun ResponseTextView(responseText: String){
    Row (
        verticalAlignment = Alignment.CenterVertically
    ){

        Text(text = "Response : ")
        Text(text = responseText)
    }

}

