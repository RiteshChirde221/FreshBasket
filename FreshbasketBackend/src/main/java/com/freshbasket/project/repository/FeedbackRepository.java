package com.freshbasket.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.freshbasket.project.entities.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long>{

}
