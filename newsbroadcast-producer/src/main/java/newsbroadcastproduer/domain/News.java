package newsbroadcastproduer.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class News {
    private String id;

    private String title;

    private NewsType newsType;

    private String description;
}
