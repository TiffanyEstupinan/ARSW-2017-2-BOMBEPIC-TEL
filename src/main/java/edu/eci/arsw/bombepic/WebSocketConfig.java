/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.bombepic;

import java.util.logging.Logger;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        //config.enableSimpleBroker("/topic");
        
        config.enableStompBrokerRelay("/topic/").setRelayHost("elephant.rmq.cloudamqp.com").setRelayPort(61613).
                setClientLogin("zxqfnbej").
                setClientPasscode("8A-LM6VPuMF7bs1Xkv7hpAdgHGz4KK7W ").
                setSystemLogin("zxqfnbej").
                setSystemPasscode("8A-LM6VPuMF7bs1Xkv7hpAdgHGz4KK7W").
                setVirtualHost("zxqfnbej");
        config.setApplicationDestinationPrefixes("/app");

            
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/stompendpoint").setAllowedOrigins("*").withSockJS();
    }
    
    

}



