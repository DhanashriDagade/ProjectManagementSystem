package com.example.project.entity;

import com.example.project.enums.TaskStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
	    name = "employee_projects",
	    uniqueConstraints = {
	        @UniqueConstraint(columnNames = {"employee_id", "project_id"})
	    }
	)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "employee_id")
    private User employee;

    @ManyToOne(optional = false)
    @JoinColumn(name = "project_id")
    private Project project;

    @Enumerated(EnumType.STRING)
    private TaskStatus taskStatus;
}
