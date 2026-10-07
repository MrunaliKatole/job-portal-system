package com.jobportal.util;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.jobportal.entity.Users;

public class CustomUserDetails
        implements UserDetails {

    private final Users user;


    public CustomUserDetails(
            Users user
    ) {
        this.user = user;
    }


    @Override
    public Collection<? extends GrantedAuthority>
    getAuthorities() {

        if (
                user.getUserTypeId() == null
        ) {
            return Collections.emptyList();
        }

        String role =
                user.getUserTypeId()
                        .getUserTypeName();

        if (
                role == null ||
                role.isBlank()
        ) {
            return Collections.emptyList();
        }

        return Collections.singletonList(
                new SimpleGrantedAuthority(
                        role
                )
        );
    }


    @Override
    public String getPassword() {

        return user.getPassword();
    }


    @Override
    public String getUsername() {

        return user.getEmail();
    }


    @Override
    public boolean isAccountNonExpired() {

        return true;
    }


    @Override
    public boolean isAccountNonLocked() {

        return true;
    }


    @Override
    public boolean isCredentialsNonExpired() {

        return true;
    }


    @Override
    public boolean isEnabled() {

        return user.isActive();
    }
}