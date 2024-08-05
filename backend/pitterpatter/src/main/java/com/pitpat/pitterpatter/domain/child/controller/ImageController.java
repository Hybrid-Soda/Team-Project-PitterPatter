package com.pitpat.pitterpatter.domain.child.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/image")
public class ImageController {

    private static final Logger logger = LoggerFactory.getLogger(ImageController.class);

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile image) {
        try {
            // 외부 서버로 파일 업로드
            String uploadUrl = "https://image.ssafy.picel.net";  // 실제 외부 서버 URL로 변경
            ResponseEntity<String> response = uploadFileToExternalServer(image, uploadUrl);

            if (response.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.ok(response.getBody());
            } else {
                logger.error("Failed to upload image, response status: {}", response.getStatusCode());
                return ResponseEntity.status(response.getStatusCode()).body("Failed to upload image");
            }
        } catch (Exception e) {
            logger.error("Exception occurred while uploading image", e);
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    private ResponseEntity<String> uploadFileToExternalServer(MultipartFile file, String uploadUrl) throws Exception {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        ByteArrayResource byteArrayResource = new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        };
        body.add("image", byteArrayResource);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        try {
            return restTemplate.exchange(uploadUrl, HttpMethod.POST, requestEntity, String.class);
        } catch (Exception e) {
            logger.error("Exception occurred while calling external server", e);
            throw e;
        }
    }
}
