package io.jenkins.blueocean.driver.embedded.service;

import com.google.common.collect.ImmutableSet;
import hudson.model.UserProperty;
import hudson.tasks.Mailer;
import io.jenkins.blueocean.api.profile.model.User;
import io.jenkins.blueocean.api.profile.model.UserDetails;
import io.jenkins.blueocean.commons.ServiceException;
import io.jenkins.blueocean.security.Credentials;

import java.io.IOException;

public final class Mapper {

    private Mapper() {}

    static UserDetails mapUserDetails(hudson.model.User user) {
        Mailer.UserProperty emailProperty = user.getProperty(Mailer.UserProperty.class);
        String email = emailProperty != null ? emailProperty.getAddress() : null;
        return new UserDetails(user.getId(), user.getFullName(), email, ImmutableSet.<Credentials>of());
    }

    static User mapUser(hudson.model.User user) {
        return new User(user.getId(), user.getFullName());
    }

    static hudson.model.User mapJenkinsUser(hudson.model.User user, String email, String fullName, Credentials credentials) {
        // Set all the desired user properties
        user.setFullName(fullName);
        addProperty(user, new Mailer.UserProperty(email));
        return user;
    }

    /** Safely set properties and throw correct exception on failure */
    private static void addProperty(hudson.model.User user, UserProperty property) {
        try {
            user.addProperty(property);
        } catch (IOException e) {
            throw new ServiceException.UnexpectedErrorExpcetion("could not add property " + property.getClass().getName());
        }
    }
}
