package com.freshbasket.project.service;

import java.util.List;

import com.freshbasket.project.entities.Feedback;

public interface FeedbackService {

	void saveFeedback(Feedback feedback);

	List<Feedback> findAllFeedbacks();

}
