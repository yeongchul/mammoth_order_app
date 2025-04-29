package com.project.mammoth_order_backend.auth.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Configuration
@Slf4j
public class WebClientConfig { // WebClient를 설정만 하는 클래스

    @Bean
    public WebClient webClient() { // 카카오 서버에 요청을 보내는 역할
        return WebClient.builder()
                .filter(ExchangeFilterFunction.ofResponseProcessor(clientResponse -> {
                    log.info("Response status: {}", clientResponse.statusCode());
                    return Mono.just(clientResponse);
                }))
                .build(); // WebClient를 어떤 방식으로 동작하게 할지 설정
    }
}
