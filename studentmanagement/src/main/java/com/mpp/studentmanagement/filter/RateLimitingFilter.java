package com.mpp.studentmanagement.filter;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitingFilter implements Filter {

    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();
    private final Map<String, Long> bannedIps = new ConcurrentHashMap<>();
    private final long BAN_DURATION_MS = 10 * 60 * 1000;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        String ip = request.getRemoteAddr();

        Long banUntil = bannedIps.get(ip);
        if (banUntil != null && System.currentTimeMillis() < banUntil) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return;
        } else {
            bannedIps.remove(ip);
        }

        Bucket bucket = buckets.computeIfAbsent(ip, k -> createBucket());
        if (bucket.tryConsume(1)) {
            filterChain.doFilter(servletRequest, servletResponse);
        } else {
            bannedIps.put(ip, System.currentTimeMillis() + BAN_DURATION_MS);
            response.setStatus(HttpServletResponse.SC_REQUEST_TIMEOUT);
        }
    }

    private Bucket createBucket() {
        Refill refill = Refill.greedy(10, Duration.ofSeconds(1));
        Bandwidth limit = Bandwidth.classic(10, refill);
        return Bucket.builder()
                .addLimit(limit)
                .build();
    }
}
