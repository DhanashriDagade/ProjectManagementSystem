package com.example.project.service;

import com.example.project.dto.ContactMessageRequest;
import com.example.project.entity.ContactMessage;
import com.example.project.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactMessageService {

    @Autowired
    private ContactMessageRepository contactRepo;

    public String saveMessage(ContactMessageRequest request) {
        if (request.getName() == null || request.getEmail() == null || request.getMessage() == null) {
            throw new IllegalArgumentException("All fields are required.");
        }
        System.out.println("Received message: " + request);


        ContactMessage message = new ContactMessage();
        message.setName(request.getName());
        message.setEmail(request.getEmail());
        message.setMessage(request.getMessage());

        contactRepo.save(message);

        return "Message sent successfully!";
    }
}

