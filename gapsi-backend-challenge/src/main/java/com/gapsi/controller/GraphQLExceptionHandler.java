package com.gapsi.controller;
import org.springframework.graphql.data.method.annotation.GraphQlExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;

import com.gapsi.exceptions.ProveedorExistenteException;

import graphql.GraphQLError;
import graphql.GraphqlErrorBuilder;

@ControllerAdvice
public class GraphQLExceptionHandler {

    @GraphQlExceptionHandler(ProveedorExistenteException.class)
    public GraphQLError handleProveedorExistenteException(ProveedorExistenteException ex) {
        return GraphqlErrorBuilder.newError()
            .message(ex.getMessage())
            .errorType(graphql.ErrorType.ValidationError)
            .build();
    }
}
