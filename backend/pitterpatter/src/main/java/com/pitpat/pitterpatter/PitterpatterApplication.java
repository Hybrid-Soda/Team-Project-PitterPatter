package com.pitpat.pitterpatter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class PitterpatterApplication {

	public static void main(String[] args) {
		SpringApplication.run(PitterpatterApplication.class, args);
	}

}
