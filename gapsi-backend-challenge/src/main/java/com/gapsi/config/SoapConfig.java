//package com.gapsi.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.oxm.jaxb.Jaxb2Marshaller;
//import org.springframework.ws.client.core.WebServiceTemplate;
//
//@Configuration
//public class SoapConfig {
//
//    @Bean
//    public WebServiceTemplate webServiceTemplate(Jaxb2Marshaller marshaller) {
//        WebServiceTemplate template = new WebServiceTemplate();
//        template.setMarshaller(marshaller);
//        template.setUnmarshaller(marshaller);
//        template.setDefaultUri("https://servidor.com/miServicio");
//        return template;
//    }
//
//    @Bean
//    public Jaxb2Marshaller marshaller() {
//        Jaxb2Marshaller m = new Jaxb2Marshaller();
//        m.setContextPath("com.miapp.soapclient");
//        return m;
//    }
//}
