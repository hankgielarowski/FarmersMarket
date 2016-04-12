package com.theironyard.services;

import com.theironyard.entities.Category;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

/**
 * Created by drewmunnerlyn on 4/12/16.
 */
public interface CategoryRepository extends CrudRepository<Category, Integer> {
        ArrayList<Category> findByCategoryNameStartingWith(String letter);
}
