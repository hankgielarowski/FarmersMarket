package com.theironyard.services;

import com.theironyard.entities.Sold;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by drewmunnerlyn on 4/13/16.
 */
public interface SoldRepository extends CrudRepository<Sold, Integer> {
}
