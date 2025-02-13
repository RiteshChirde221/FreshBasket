package com.freshbasket.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.freshbasket.project.entities.Feedback;
import com.freshbasket.project.repository.FeedbackRepository;

@Service
public class FeedbackServiceImpl implements FeedbackService {
	
	@Autowired
	FeedbackRepository feedbackRepo;

	@Override
	public void saveFeedback(Feedback feedback) {
		feedbackRepo.save(feedback);
	}

	@Override
	public List<Feedback> findAllFeedbacks() {
		// TODO Auto-generated method stub
		return feedbackRepo.findAll();
	}

}
